"""
Wektor — Daily Watch
=====================
Powers the "floating reminder" feature: watch a database query, run it once
a day (even if the app window is closed — main.js keeps a background
scheduler alive via the system tray), and surface a short "what changed
since yesterday" summary the next time the user opens the app.

Storage:
  - Watch CONFIG (db type/host/port/database/user/query/label/check hour)
    is non-secret and stored in a plain JSON file in the app-data dir.
  - The DB PASSWORD is stored separately via key_store.py's existing
    encrypted/keyring storage (provider name "db_watch") — never written
    into the plain config file.
  - SNAPSHOTS (yesterday's computed signals) are stored in the same
    app-data dir, one JSON file, trimmed to the last 14 checks.

This module deliberately does NOT run arbitrary code — it only executes
the user's own SQL SELECT query against their own database (same trust
model as a desktop DB client like DBeaver: the user owns both the query
and the credentials). Nothing here touches engine.py's sandboxed AI-code
execution path.
"""
import json
import os
import re
import sqlite3
import datetime
import time
from typing import Any

import pandas as pd

from key_store import save_api_key, get_api_key, delete_api_key

_CONFIG_DIR_ENV = "WEKTOR_CONFIG_DIR"  # same override tests can use for key_store
_DB_WATCH_PROVIDER = "db_watch"  # key_store "provider" name for the saved password

# ---------------------------------------------------------------------------
# Database query safety limits — applied to BOTH Daily Watch and the
# Database Connector, since both ultimately call run_watch_query() below.
# ---------------------------------------------------------------------------
QUERY_TIMEOUT_SECONDS = 30

# A cap on the *size* of the fetched result (in MB), not a row count. A
# fixed row-count cap (e.g. "10,000 rows") doesn't actually bound memory
# use — a row can be a handful of bytes or many KB depending on how wide
# the query is. Streaming the result in chunks and stopping once the
# accumulated size crosses this threshold protects against runaway memory
# use regardless of the query's shape.
MAX_QUERY_RESULT_MB = 50

# Read-only enforcement: only SELECT / WITH ... SELECT is allowed. This is
# a heuristic guard, not a full SQL parser — it exists to stop accidental
# or copy-pasted destructive queries from running against the user's own
# database with the user's own credentials, not to defend against an
# attacker who already has those credentials (at that point this app isn't
# the weak link).
_DISALLOWED_SQL_KEYWORDS = {
    "insert", "update", "delete", "drop", "alter", "truncate", "create",
    "grant", "revoke", "replace", "merge", "call", "exec", "execute",
    "attach", "detach", "pragma", "copy", "vacuum", "reindex",
}


MAX_QUERY_LENGTH = 8000  # generous for legit multi-join SQL, still bounds abuse


def _validate_readonly_query(query: str) -> None:
    """Raises ValueError if `query` is anything other than a single
    read-only SELECT (or WITH ... SELECT) statement."""
    stripped = (query or "").strip()
    if not stripped:
        raise ValueError("Query is empty.")
    if len(stripped) > MAX_QUERY_LENGTH:
        raise ValueError(
            f"Query is {len(stripped):,} characters, which exceeds the "
            f"{MAX_QUERY_LENGTH:,} character limit."
        )

    # Allow a single harmless trailing semicolon, but reject stacked
    # statements (a second statement after it).
    body = stripped.rstrip(";").strip()
    if ";" in body:
        raise ValueError(
            "Multiple SQL statements detected. Daily Watch and the Database "
            "Connector only run a single read-only SELECT query at a time."
        )

    first_word_match = re.match(r"^\(*\s*(\w+)", body, re.IGNORECASE)
    first_word = first_word_match.group(1).lower() if first_word_match else ""
    if first_word not in ("select", "with"):
        raise ValueError(
            f"Only SELECT (or WITH ... SELECT) queries are allowed here — "
            f"detected a '{first_word.upper() or '?'}' statement. This is "
            "blocked for safety since this feature runs directly against "
            "your database with your own credentials."
        )

    tokens = set(re.findall(r"[A-Za-z_]+", body.lower()))
    hit = tokens & _DISALLOWED_SQL_KEYWORDS
    if hit:
        raise ValueError(
            f"Query blocked — contains disallowed keyword(s): {', '.join(sorted(hit))}. "
            "Only read-only SELECT queries are permitted for Daily Watch and "
            "the Database Connector."
        )


def _fetch_with_size_cap(query: str, conn, max_mb: int = MAX_QUERY_RESULT_MB):
    """Streams `query`'s results in chunks and stops once the accumulated
    in-memory size crosses max_mb, rather than capping by row count.
    Returns (dataframe, truncated: bool)."""
    max_bytes = max_mb * 1024 * 1024
    chunks = []
    total_bytes = 0
    truncated = False

    for chunk in pd.read_sql_query(query, conn, chunksize=5000):
        chunk_bytes = int(chunk.memory_usage(deep=True).sum())
        if total_bytes + chunk_bytes > max_bytes:
            remaining = max_bytes - total_bytes
            if remaining > 0 and len(chunk) > 0:
                per_row = chunk_bytes / len(chunk)
                fit_rows = max(int(remaining / per_row), 0)
                if fit_rows > 0:
                    chunks.append(chunk.iloc[:fit_rows])
            truncated = True
            break
        chunks.append(chunk)
        total_bytes += chunk_bytes

    if not chunks:
        return pd.DataFrame(), truncated
    return pd.concat(chunks, ignore_index=True), truncated


def _app_data_dir() -> str:
    override = os.environ.get(_CONFIG_DIR_ENV)
    if override:
        os.makedirs(override, exist_ok=True)
        return override
    if os.name == "nt":
        base = os.environ.get("APPDATA", os.path.expanduser("~"))
    elif os.uname().sysname == "Darwin":
        base = os.path.expanduser("~/Library/Application Support")
    else:
        base = os.environ.get("XDG_CONFIG_HOME", os.path.expanduser("~/.config"))
    path = os.path.join(base, "Wektor")
    os.makedirs(path, exist_ok=True)
    return path


def _config_file() -> str:
    return os.path.join(_app_data_dir(), "daily_watch_config.json")


def _snapshots_file() -> str:
    return os.path.join(_app_data_dir(), "daily_watch_snapshots.json")


# ---------------------------------------------------------------------------
# Config (non-secret) storage
# ---------------------------------------------------------------------------
def save_config(config: dict) -> None:
    """config keys: label, dbType, host, port, database, user, query,
    checkHour (0-23), enabled (bool), backgroundEnabled (bool)."""
    safe = {k: v for k, v in config.items() if k != "password"}
    with open(_config_file(), "w", encoding="utf-8") as f:
        json.dump(safe, f)


def get_config() -> dict | None:
    if not os.path.exists(_config_file()):
        return None
    try:
        with open(_config_file(), encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return None


def delete_config() -> None:
    if os.path.exists(_config_file()):
        os.remove(_config_file())
    delete_api_key(_DB_WATCH_PROVIDER)


def save_password(password: str) -> None:
    save_api_key(_DB_WATCH_PROVIDER, password)


def get_password() -> str | None:
    return get_api_key(_DB_WATCH_PROVIDER)


# ---------------------------------------------------------------------------
# Snapshot storage (last 14 checks)
# ---------------------------------------------------------------------------
def _load_snapshots() -> list:
    if not os.path.exists(_snapshots_file()):
        return []
    try:
        with open(_snapshots_file(), encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def _save_snapshots(snapshots: list) -> None:
    with open(_snapshots_file(), "w", encoding="utf-8") as f:
        json.dump(snapshots[-14:], f)


def get_latest_snapshot() -> dict | None:
    snaps = _load_snapshots()
    return snaps[-1] if snaps else None


def append_snapshot(snapshot: dict) -> None:
    snaps = _load_snapshots()
    snaps.append(snapshot)
    _save_snapshots(snaps)


# ---------------------------------------------------------------------------
# Query execution — SQLite, PostgreSQL, and MySQL.
#
# PostgreSQL uses pg8000 and MySQL uses PyMySQL rather than psycopg2/
# mysqlclient — both are pure-Python drivers with no C-extension build step,
# so they install with a plain `pip install` on any machine (no pg_config,
# no MySQL client headers, no compiler needed). That's what makes it safe to
# list them as normal hard dependencies in requirements.txt instead of an
# optional extra the user has to know to install themselves.
# ---------------------------------------------------------------------------
def run_watch_query(db_type: str, host: str, port: str, database: str,
                     user: str, password: str, query: str) -> tuple[pd.DataFrame, bool]:
    """Executes the user's own query against their own database. Returns
    (dataframe, truncated) — truncated is True if the result was cut off
    at MAX_QUERY_RESULT_MB.

    Safety controls (defense-in-depth, not a substitute for the user's own
    DB permissions):
      - read-only enforcement — only a single SELECT / WITH ... SELECT
        statement is allowed (see _validate_readonly_query), AND the DB
        connection itself is opened/configured read-only where the driver
        supports it (SQLite: read-only URI mode; Postgres/MySQL: session
        set to read-only transactions) — so even a query that slipped past
        the keyword filter would be rejected by the database engine itself,
        not just by our own text check
      - a server-side query timeout (QUERY_TIMEOUT_SECONDS) so a slow or
        expensive query can't hang the app or the background scheduler
      - a byte-size cap on the fetched result (MAX_QUERY_RESULT_MB), not a
        row-count cap — see _fetch_with_size_cap for why
    """
    _validate_readonly_query(query)
    db_type = (db_type or "").lower().strip()

    if db_type == "sqlite":
        if not database or not os.path.exists(database):
            raise ValueError(f"SQLite file not found: {database}")
        # Open in TRUE read-only mode via the sqlite3 URI form — this is
        # enforced by SQLite itself at the file-access level, so a write
        # attempt fails even if it somehow got past _validate_readonly_query.
        db_uri = f"file:{os.path.abspath(database)}?mode=ro"
        conn = sqlite3.connect(db_uri, uri=True)
        deadline = time.monotonic() + QUERY_TIMEOUT_SECONDS
        conn.set_progress_handler(
            lambda: 1 if time.monotonic() > deadline else 0, 1000
        )
        try:
            return _fetch_with_size_cap(query, conn, max_mb=MAX_QUERY_RESULT_MB)
        except sqlite3.OperationalError as e:
            if "interrupted" in str(e).lower():
                raise RuntimeError(
                    f"Query exceeded the {QUERY_TIMEOUT_SECONDS}s timeout and was stopped."
                )
            raise
        finally:
            conn.close()

    elif db_type == "postgres":
        try:
            import pg8000.dbapi as pg8000
        except ImportError:
            raise RuntimeError(
                "pg8000 is not installed. Run: pip install pg8000"
            )
        conn = pg8000.connect(
            host=host or "localhost",
            port=int(port) if port else 5432,
            database=database,
            user=user,
            password=password,
            timeout=10,
        )
        try:
            cur = conn.cursor()
            cur.execute(f"SET statement_timeout = {int(QUERY_TIMEOUT_SECONDS * 1000)}")
            # Postgres-enforced read-only: every transaction in this session
            # is now read-only at the engine level, regardless of what the
            # connected role is actually permitted to do.
            cur.execute("SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY")
            return _fetch_with_size_cap(query, conn, max_mb=MAX_QUERY_RESULT_MB)
        finally:
            conn.close()

    elif db_type == "mysql":
        try:
            import pymysql
        except ImportError:
            raise RuntimeError(
                "PyMySQL is not installed. Run: pip install PyMySQL"
            )
        conn = pymysql.connect(
            host=host or "localhost",
            port=int(port) if port else 3306,
            database=database,
            user=user,
            password=password,
            connect_timeout=10,
        )
        try:
            cur = conn.cursor()
            # MAX_EXECUTION_TIME (ms) only affects SELECT statements in
            # MySQL 5.7.8+ — fine here since only SELECT is ever allowed.
            cur.execute(f"SET SESSION MAX_EXECUTION_TIME={int(QUERY_TIMEOUT_SECONDS * 1000)}")
            # MySQL-enforced read-only for the rest of this session (5.6+).
            cur.execute("SET SESSION TRANSACTION READ ONLY")
            return _fetch_with_size_cap(query, conn, max_mb=MAX_QUERY_RESULT_MB)
        finally:
            conn.close()

    raise ValueError(f"Unknown database type: {db_type}")


# ---------------------------------------------------------------------------
# Snapshot computation + diff engine — the actual "what changed" logic.
# ---------------------------------------------------------------------------
def compute_snapshot(df: pd.DataFrame) -> dict:
    """A small set of comparable signals — deliberately lightweight since
    this runs once a day in the background, not a full analysis pass."""
    numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
    object_cols = df.select_dtypes(include=["object", "string"]).columns.tolist()

    numeric_stats = {}
    for col in numeric_cols[:3]:
        try:
            numeric_stats[col] = {
                "mean": float(df[col].mean()),
                "sum": float(df[col].sum()),
            }
        except Exception:
            continue

    top_category = None
    if object_cols:
        try:
            counts = df[object_cols[0]].value_counts()
            if len(counts) > 0:
                top_category = {"column": object_cols[0], "value": str(counts.index[0]), "count": int(counts.iloc[0])}
        except Exception:
            pass

    return {
        "checked_at": datetime.datetime.now().isoformat(),
        "row_count": int(len(df)),
        "numeric_stats": numeric_stats,
        "top_category": top_category,
    }


def _fmt_delta(old_val: float, new_val: float, as_int: bool = False) -> str:
    delta = new_val - old_val
    pct = (delta / old_val * 100) if old_val not in (0, None) else None
    sign = "+" if delta >= 0 else ""
    if as_int:
        base = f"{sign}{int(round(delta)):,}"
    else:
        base = f"{sign}{delta:,.2f}"
    if pct is not None and abs(pct) >= 0.05:
        return f"{base} ({sign}{pct:,.1f}%)"
    return base


def diff_snapshots(old: dict | None, new: dict) -> dict:
    """Returns {"changed": bool, "summary_points": [str, str, str]} —
    2-3 short bullet points, most-notable-first."""
    points = []

    if old is None:
        return {
            "changed": True,
            "summary_points": [
                f"First check complete — {new['row_count']:,} rows captured as today's baseline.",
                "Tomorrow's check will compare against this snapshot.",
            ],
        }

    # Row count change
    old_rows, new_rows = old.get("row_count", 0), new.get("row_count", 0)
    if old_rows != new_rows:
        points.append(f"Row count: {old_rows:,} → {new_rows:,} ({_fmt_delta(old_rows, new_rows, as_int=True)})")

    # Numeric column changes
    old_stats = old.get("numeric_stats", {}) or {}
    new_stats = new.get("numeric_stats", {}) or {}
    for col, new_vals in new_stats.items():
        old_vals = old_stats.get(col)
        if not old_vals:
            continue
        old_mean, new_mean = old_vals.get("mean"), new_vals.get("mean")
        if old_mean is None or new_mean is None:
            continue
        if abs(new_mean - old_mean) > 1e-9:
            points.append(f"Avg {col}: {old_mean:,.2f} → {new_mean:,.2f} ({_fmt_delta(old_mean, new_mean)})")

    # Top category shift
    old_top, new_top = old.get("top_category"), new.get("top_category")
    if old_top and new_top and old_top.get("column") == new_top.get("column"):
        if old_top.get("value") != new_top.get("value"):
            points.append(
                f"Top {new_top['column']} changed: '{old_top['value']}' → '{new_top['value']}'"
            )
        elif old_top.get("count") != new_top.get("count"):
            points.append(
                f"'{new_top['value']}' count: {old_top['count']:,} → {new_top['count']:,} "
                f"({_fmt_delta(old_top['count'], new_top['count'], as_int=True)})"
            )

    if not points:
        return {"changed": False, "summary_points": ["No meaningful change since the last check — metrics are stable."]}

    return {"changed": True, "summary_points": points[:3]}