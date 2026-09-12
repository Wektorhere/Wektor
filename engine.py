import sys

# Force UTF-8 stdio regardless of the OS console's default codepage. On
# Windows, the console often defaults to cp1252, which cannot encode
# characters like em-dashes or arrows and crashes the whole process the
# moment any print() statement (including sandbox_executor.py's own
# startup banner, imported below) contains one. main.js also sets
# PYTHONIOENCODING/PYTHONUTF8 env vars before spawning this process as the
# primary fix; this reconfigure is a second layer for anyone running
# `python engine.py` directly (e.g. via start.bat) outside that env.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import json
import os
import re
import tempfile
import time
import traceback
import urllib.error
import urllib.request
import secrets
import warnings
from functools import wraps

import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from sandbox_executor import run_sandboxed
from key_store import save_api_key, get_api_key, delete_api_key, has_api_key, mask_key
from key_validation import validate_api_key
import daily_watch
import license_manager

# Suppress pandas warnings about date parsing
warnings.simplefilter(action='ignore', category=UserWarning)

app = Flask(__name__)

# When PyInstaller freezes this into a onefile executable, __file__ points
# into the temp extraction folder (sys._MEIPASS), NOT the directory the
# actual .exe lives in — so a naive os.path.dirname(__file__) would silently
# stop finding .env next to the shipped binary. sys.frozen + sys.executable
# is the correct way to locate "next to the real exe" in both onefile and
# onedir PyInstaller builds.
if getattr(sys, "frozen", False):
    BASE_DIR = os.path.dirname(sys.executable)
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Generate secure local token for authentication
LOCAL_AUTH_TOKEN = secrets.token_urlsafe(32)

# ---------------------------------------------------------------------------
# Temp file cleanup — the Database Connector and Multi-File Merge features
# each export a working CSV into a temp directory (wektor_db_exports/,
# wektor_merged/) so the result can flow through the normal file-analysis
# pipeline. Those exports were never being cleaned up, so they'd silently
# accumulate on disk (and could contain real query results / merged data)
# for as long as the app kept getting used. Sweep both directories on every
# engine startup and delete anything older than the max-age window.
# ---------------------------------------------------------------------------
_TEMP_EXPORT_DIR_NAMES = ("wektor_db_exports", "wektor_merged")
_TEMP_EXPORT_MAX_AGE_HOURS = 24


def cleanup_stale_temp_exports(max_age_hours: float = _TEMP_EXPORT_MAX_AGE_HOURS) -> None:
    cutoff = time.time() - (max_age_hours * 3600)
    for dir_name in _TEMP_EXPORT_DIR_NAMES:
        dir_path = os.path.join(tempfile.gettempdir(), dir_name)
        if not os.path.isdir(dir_path):
            continue
        for fname in os.listdir(dir_path):
            fpath = os.path.join(dir_path, fname)
            try:
                if os.path.isfile(fpath) and os.path.getmtime(fpath) < cutoff:
                    os.remove(fpath)
                    print(f"[cleanup] Removed stale temp export: {fpath}")
            except OSError as e:
                print(f"[cleanup] Could not remove {fpath}: {e}")


def require_local_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Defense-in-depth against DNS rebinding: CORS already restricts
        # which origins a *browser* will let JS read the response from, but
        # CORS's preflight only fires for "non-simple" requests. A Host
        # header check closes that gap directly at the server, independent
        # of browser CORS behavior. This is a secondary layer — the actual
        # enforcement is still the per-launch random LOCAL_AUTH_TOKEN below,
        # since the app is loopback-only (127.0.0.1, confirmed not reachable
        # via the machine's real network IP) and the token is 256 bits of
        # randomness a rebinding attacker has no way to read.
        host_header = request.headers.get('Host', '')
        host_only = host_header.split(':')[0]
        if host_only not in ('127.0.0.1', 'localhost'):
            return jsonify({"error": "Unauthorized"}), 401

        auth_header = request.headers.get('X-Local-Auth-Token')
        # secrets.compare_digest instead of != — a plain string comparison
        # short-circuits on the first mismatched character, which leaks how
        # many leading characters of a guess were correct via response
        # timing. compare_digest runs in constant time regardless of where
        # (or whether) the strings differ. Low real-world risk for a
        # loopback-only local token, but it's a zero-cost fix.
        if not auth_header or not secrets.compare_digest(auth_header, LOCAL_AUTH_TOKEN):
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function


def require_pro(f):
    """Gates an entire route behind an active Pro license. Use for features
    that are Pro-only regardless of request content (Daily Watch). For
    routes that are only conditionally Pro-gated depending on what's in the
    request (e.g. connect-db, where SQLite stays free but MySQL/Postgres
    doesn't), check license_manager.check_entitlement() inline instead --
    a blanket decorator can't express that condition.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        result = license_manager.check_entitlement()
        if not result.get("entitled"):
            return jsonify({
                "error": "This feature requires a Wektor Pro license.",
                "errorCode": "PRO_REQUIRED",
                "reason": result.get("reason"),
            }), 402
        return f(*args, **kwargs)
    return decorated_function

# Restrict CORS only to local frontend
CORS(app, origins=['http://127.0.0.1:5005'])

def load_env_file() -> None:
    env_path = os.path.join(BASE_DIR, ".env")
    if not os.path.exists(env_path):
        return

    with open(env_path, encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value

load_env_file()

def build_chart_code_prompt(schema_description: str, row_count: int) -> str:
    """Phase 1 of the two-call analysis pipeline. Asks the AI for ONLY
    structured/numeric output (chart data + a small stats dict) — never
    long-form prose. Prose embedded inside exec()-able Python string
    literals is what was driving truncation at the old shared token
    ceiling (see build_narrative_prompt below for the prose half, which
    is generated separately as plain JSON, not code, and is cheap enough
    that truncation there is very unlikely).
    """
    return (
        "OUTPUT ONLY EXECUTABLE PYTHON CODE. NO MARKDOWN. NO EXPLANATIONS. NO PROSE.\n"
        "The code will be run with exec(). Any non-code text will cause a SyntaxError.\n\n"
        f"REAL DATASET SIZE: {row_count:,} total rows.\n"
        "DATASET SCHEMA (column names, types, and aggregate stats only — you are "
        "NOT given any actual row values, so detect structure dynamically and never "
        "assume specific string values, category spellings, or formats beyond what's "
        "listed below):\n"
        f"{schema_description}\n\n"
        "AVAILABLE VARIABLES:\n"
        "  df   -> the full pandas DataFrame (all rows)\n"
        "  pd   -> pandas module\n"
        "  np   -> numpy module\n"
        "  re, math, statistics, collections, datetime -> already loaded, ready to use\n\n"
        "YOUR TASK: Write Python code that analyses df and assigns ALL of the following variables.\n"
        "Every variable MUST be assigned exactly as named below. Do NOT write any long "
        "sentences or prose into string variables — only short labels/explanations as specified.\n\n"
        "REQUIRED VARIABLES:\n\n"
        "# -- Chart data: list of dicts --\n"
        "time_series_data        = list  # [{\"time\": str, \"value\": float}, ...]  up to 24 entries\n"
        "category_data           = list  # [{\"category\": str, \"count\": int}, ...]  top 5 entries\n"
        "distribution_data       = list  # [{\"name\": str, \"value\": int}, ...]   3-5 buckets\n\n"
        "# -- Explanation strings (ONE short sentence each, not a paragraph) --\n"
        "time_series_explanation    = str\n"
        "category_explanation       = str\n"
        "distribution_explanation   = str\n\n"
        "# -- Computed stats dict: this is the ONLY place raw numbers/labels go. --\n"
        "# A second pass will turn these into narrative sentences, so include whatever\n"
        "# numeric or categorical facts would be useful for that — e.g. mean/median/min/max\n"
        "# of key numeric columns, most/least common categories, notable counts, simple\n"
        "# correlations, null counts, anything you'd want a human summary to mention.\n"
        "# Keep VALUES short (numbers, short strings) — this is data, not sentences.\n"
        "computed_stats = dict   # {\"key_metric_name\": value, ...}  8-15 entries is plenty\n\n"
        "STRICT RULES:\n"
        "1. Detect column types dynamically: df.select_dtypes(include=['number']).columns etc.\n"
        "2. If you wrap code in try/except, you MUST indent the block properly. Do not write unindented blocks inside try/except. Example:\n"
        "   try:\n"
        "       val = df['col'].mean()\n"
        "   except Exception:\n"
        "       val = 0\n"
        "3. If a chart has no suitable data, assign an empty list [].\n"
        "4. Use 4-space indentation ONLY.\n"
        "5. Do NOT add import statements, not even for standard library modules. "
        "pd, np, re, math, statistics, collections, and datetime are already loaded — use them directly, e.g. `re.findall(...)`, `datetime.datetime.now()`.\n"
        "6. NEVER iterate row-by-row over df — no .iterrows(), no .itertuples(), no `for i in range(len(df))` with df.iloc[i]. "
        "The dataset can have hundreds of thousands or millions of rows, and row-wise Python loops will fail (hard-capped at 20,000 loop iterations). "
        "Always use vectorized pandas/numpy operations instead: column arithmetic (df['c'] = df['a'] + df['b']), "
        ".value_counts(), .groupby(), boolean masks (df[df['x'] > 5]), pd.cut(), np.select(), df.corr(), .mean()/.sum()/.std(). "
        "Looping is fine ONLY over small fixed collections you construct yourself (e.g. a handful of column names or chart buckets), never over the rows of df.\n"
        "7. Do NOT print anything. Do NOT add comments after the code.\n"
        "8. The very first character of your response must be a Python identifier or #.\n\n"
        "START CODE:"
    )


def build_narrative_prompt(computed_stats: dict, chart_data: dict, schema_description: str, row_count: int) -> str:
    """Phase 2 of the two-call analysis pipeline. Takes the numbers the
    sandboxed code already computed and asks the AI to turn them into
    the actual narrative sentences — as plain JSON text, not exec()-able
    code. This half never touches the sandbox: json.loads() is the only
    thing done with the response.
    """
    return (
        "OUTPUT ONLY A JSON OBJECT. NO MARKDOWN FENCES. NO PROSE OUTSIDE THE JSON.\n"
        "Your entire response must be valid JSON parseable by json.loads() — nothing before "
        "or after it, no ```json fences.\n\n"
        f"DATASET: {row_count:,} total rows.\n"
        f"COLUMN SCHEMA:\n{schema_description}\n\n"
        f"COMPUTED STATS (already calculated from the real data — treat these as ground truth):\n"
        f"{json.dumps(computed_stats, default=str)}\n\n"
        f"CHART SUMMARY (already-derived chart data, for context on what's visualized):\n"
        f"  time_series_data: {len(chart_data.get('time_series_data') or [])} points\n"
        f"  category_data: {chart_data.get('category_data') or []}\n"
        f"  distribution_data: {chart_data.get('distribution_data') or []}\n\n"
        "YOUR TASK: Using ONLY the computed stats and chart summary above (do not invent numbers "
        "not present there), write a JSON object with exactly these string keys:\n\n"
        "{\n"
        '  "margin_signal": "One sentence: key metric summary, e.g. \'Average order value: $142\'",\n'
        '  "exec_summary": "A comprehensive 3-5 sentence summary highlighting overall trends, scale of operations, and main takeaways.",\n'
        '  "risk_text": "A 2-3 sentence analysis of potential risks, anomalies, inefficiencies, or negative trends.",\n'
        '  "opp_text": "A 2-3 sentence description of actionable business opportunities or optimization strategies.",\n'
        '  "what_changed_text": "A 2-3 sentence analysis of what metrics or trends changed or showed anomalies.",\n'
        '  "why_changed_text": "A 2-3 sentence analysis explaining why these changes happened.",\n'
        '  "action_text": "A 2-3 sentence description of actionable next steps."\n'
        "}\n\n"
        "Every key above is required. Output ONLY the JSON object, starting with { and ending with }."
    )

def sanitize_ai_code(ai_code: str) -> str:
    """Strip markdown fencing, prose preambles, and Unicode smart-quotes.
    Does NOT attempt to rewrite indentation — that breaks valid AI code.
    """
    ai_code = ai_code.strip()

    # 1. Normalize Unicode smart punctuation that breaks Python parsing
    unicode_replacements = {
        '\u2011': '-',   # Non-breaking hyphen
        '\u2012': '-',   # Figure dash
        '\u2013': '-',   # En dash
        '\u2014': '-',   # Em dash
        '\u2015': '-',   # Horizontal bar
        '\u2018': "'",   # Left single quote
        '\u2019': "'",   # Right single quote
        '\u201c': '"',   # Left double quote
        '\u201d': '"',   # Right double quote
        '\u2026': '...',  # Ellipsis
        '\u00a0': ' ',   # Non-breaking space
    }
    for old, new in unicode_replacements.items():
        ai_code = ai_code.replace(old, new)

    # 2. Strip markdown code fences (```python ... ``` or ``` ... ```)
    if '```python' in ai_code:
        start = ai_code.find('```python') + len('```python')
        end = ai_code.find('```', start)
        ai_code = ai_code[start: end if end != -1 else len(ai_code)].strip()
    elif '```' in ai_code:
        # Strip opening fence line
        first_newline = ai_code.find('\n')
        if first_newline != -1 and ai_code[:first_newline].strip().startswith('```'):
            ai_code = ai_code[first_newline + 1:].strip()
        # Strip closing fence
        if ai_code.endswith('```'):
            ai_code = ai_code[:-3].strip()

    # 3. Drop any leading prose lines before the first line that looks like Python
    CODE_STARTS = (
        '#', 'import ', 'from ', 'try:', 'for ', 'if ', 'while ',
        'margin_', 'exec_', 'risk_', 'opp_', 'time_', 'category_',
        'distribution_', 'df.', 'numeric_', 'cat_', 'date_',
    )
    lines = ai_code.split('\n')
    start_idx = 0
    for idx, line in enumerate(lines):
        stripped = line.strip()
        if stripped and (any(stripped.startswith(k) for k in CODE_STARTS) or '=' in stripped):
            start_idx = idx
            break
    ai_code = '\n'.join(lines[start_idx:])

    # 4. Replace tabs with 4 spaces (safest normalisation that preserves structure)
    ai_code = ai_code.replace('\t', '    ')

    # 5. Drop trailing whitespace per line
    ai_code = '\n'.join(line.rstrip() for line in ai_code.split('\n')).rstrip()

    # 6. Compile-check: if the AI output was truncated (e.g. open f-string brace,
    #    incomplete assignment), compile() raises SyntaxError here instead of inside exec().
    #    Return empty string so the caller uses the pandas fallback gracefully.
    try:
        compile(ai_code, '<ai_generated>', 'exec')
    except SyntaxError as se:
        print(f"[SANITIZE] AI code has SyntaxError (likely truncated output): {se}")
        print("[SANITIZE] Returning empty string - will use pandas fallback.")
        return ''

    return ai_code


def parse_narrative_json(raw: str) -> dict | None:
    """Parse the phase-2 narrative response as plain JSON. No exec(), no
    sandbox — this text is never executed, only json.loads()'d, so it's
    treated the same as any other API response body. Returns None (not
    an exception) on any failure so the caller can retry or fall back to
    generate_fallback_metrics() text without a special-cased except block
    for every possible JSON error.
    """
    if not raw:
        return None
    text = raw.strip()

    # Strip markdown fences if the model added them despite instructions.
    if '```json' in text:
        start = text.find('```json') + len('```json')
        end = text.find('```', start)
        text = text[start: end if end != -1 else len(text)].strip()
    elif '```' in text:
        first_newline = text.find('\n')
        if first_newline != -1 and text[:first_newline].strip().startswith('```'):
            text = text[first_newline + 1:].strip()
        if text.endswith('```'):
            text = text[:-3].strip()

    # If there's any leading/trailing prose around the JSON object, keep
    # only the outermost {...} span.
    first_brace = text.find('{')
    last_brace = text.rfind('}')
    if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
        text = text[first_brace:last_brace + 1]

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError as je:
        print(f"[NARRATIVE] JSON parse failed (likely truncated): {je}")
        return None

    if not isinstance(parsed, dict):
        print("[NARRATIVE] Parsed JSON was not an object, discarding.")
        return None

    return parsed


_IMPORT_LINE_RE = re.compile(r'^\s*(import\s+\S|from\s+\S+\s+import\s)')


def reject_import_statements(code: str) -> None:
    """Fail fast, with an actionable message, if the AI code contains an
    import statement.

    The sandbox has NO import mechanism at all — `__import__` isn't in its
    allowed builtins (see sandbox_executor.py's _SAFE_BUILTINS). RestrictedPython
    doesn't reject `import` syntax at compile time, so a stray `import re` or
    `import datetime` in AI-generated code compiles fine and only fails at
    runtime with an opaque "__import__ not found" error. That message doesn't
    clearly tell a model "you wrote an import statement, remove it" — so it
    can burn through every retry attempt and fall back to generic metrics.
    Catching it here, before the code ever reaches the sandbox, lets the
    retry loop feed back a message the model can actually act on.
    """
    for line in code.split('\n'):
        if _IMPORT_LINE_RE.match(line):
            raise ValueError(
                "Your code contains an `import` statement, which is disabled in "
                "this sandbox — there is no import mechanism available at all, "
                "not even for standard library modules. Remove ALL import "
                "statements. pd, np, re, math, statistics, collections, and "
                "datetime are already loaded as ready-to-use variables — use "
                "them directly (e.g. `re.findall(...)`, `datetime.datetime.now()`) "
                "without importing anything."
            )


# ---------------------------------------------------------------------------
# Data Roast — a pure text-generation feature, not code-generation.
#
# CRITICAL PRIVACY NOTE: this reuses the analysis metrics the frontend
# already has in appState (margin, summaries, chart aggregates, deep-dive
# stats, data_quality) — everything here is ALREADY aggregated/derived
# data, never raw rows. No new file read, no new sandbox execution, no new
# privacy surface. It's purely: take numbers we already computed, ask the
# model to make fun of them, and get back a short string + a score.
# ---------------------------------------------------------------------------

ROAST_SYSTEM_PROMPT = (
    "You are a savage, hilarious stand-up-comedian data reviewer. Your entire "
    "job is to roast a business's dashboard metrics — brutally honest, funny, "
    "punchy one-liners about NUMBERS and TRENDS. You are never mean about the "
    "person, their intelligence, their effort, or anything protected "
    "(race, gender, religion, disability, age, nationality, etc.). You never "
    "use real company or brand names, never give medical/legal/financial "
    "advice, and never use profanity or slurs. You always respond with ONLY "
    "raw JSON — no markdown fences, no prose before or after the JSON object."
)

# Voice modifiers for the "AI Remix" personalities — the template engine
# (frontend) mirrors these same four personalities for its instant,
# offline roasts; this is only used when the user explicitly asks for a
# more personalized AI-generated pass.
ROAST_PERSONALITY_VOICES = {
    "brutalBoss": (
        "Adopt the voice of 'The Brutal Boss': blunt, no-filter, zero "
        "sugar-coating, short hard-hitting sentences."
    ),
    "sarcasticFriend": (
        "Adopt the voice of 'The Sarcastic Friend': witty, relatable, "
        "deadpan sarcasm, pop-culture-flavored, like a friend teasing you "
        "over coffee."
    ),
    "dataScientist": (
        "Adopt the voice of 'The Data Scientist': dry, technical, "
        "statistically-flavored humor (references to significance, "
        "baselines, variance) without turning into an actual stats lecture."
    ),
    "motivationalCoach": (
        "Adopt the voice of 'The Motivational Coach': tough love — roast "
        "honestly, then pivot to a genuine, encouraging closing line. "
        "Never end on pure negativity."
    ),
}


def build_roast_prompt(metrics: dict, file_name: str = "your dataset", personality: str = "brutalBoss") -> str:
    """Builds a compact prompt from ALREADY-COMPUTED analysis metrics —
    never touches the underlying dataframe or file. `metrics` is whatever
    the frontend already holds in appState after /api/analyze (margin,
    summaries, chart_data, deep_dive_data, data_quality) sent back up as-is.

    NOTE: `file_name` is intentionally never forwarded into the prompt
    text below. A user-chosen filename is not aggregated/derived data —
    it can carry real client names, project codenames, or otherwise
    sensitive text (e.g. "Q3_Layoffs_AcmeCorp_CONFIDENTIAL.xlsx") that
    privacy.md never promises to protect from the cloud AI provider.
    The parameter is kept for API compatibility / potential future local
    (non-AI) use, but is deliberately unused here.
    """
    metrics = metrics or {}

    def first_present(*keys, default=""):
        for key in keys:
            value = metrics.get(key)
            if value not in (None, "", "N/A", "Awaiting data...", "Pending"):
                return value
        return default

    margin = first_present("margin", "margin_signal")
    exec_summary = first_present("executiveSummary", "executive_summary", "exec_summary")
    risk = first_present("risk_statement", "risk_text", "risk")
    opportunity = first_present("opportunity_statement", "opp_text", "opportunity")
    revenue_eff = first_present("revenueEfficiency", "revenue_efficiency")

    chart_data = metrics.get("chart_data") or {}
    ts = chart_data.get("time_series_data") or []
    cat = chart_data.get("category_data") or []

    ts_summary = ""
    if ts:
        try:
            first_v = ts[0].get("value")
            last_v = ts[-1].get("value")
            ts_summary = f"Trend goes from {first_v} to {last_v} across {len(ts)} points."
        except (AttributeError, IndexError, KeyError):
            pass

    cat_summary = ""
    if cat:
        try:
            top = cat[0]
            cat_summary = f"Top category: '{top.get('category')}' at {top.get('count')}."
        except (AttributeError, IndexError, KeyError):
            pass

    deep_dive = metrics.get("deep_dive_data") or {}
    outlier_pct = deep_dive.get("outlier_percentage")
    outlier_line = ""
    if isinstance(outlier_pct, (int, float)):
        outlier_line = f"{outlier_pct:.1f}% of rows are statistical outliers."
    corr_line = deep_dive.get("correlation_explanation") or ""

    data_quality = metrics.get("data_quality") or {}
    dupe_pct = data_quality.get("duplicate_percentage")
    dupe_line = ""
    if isinstance(dupe_pct, (int, float)) and dupe_pct > 0:
        dupe_line = f"{dupe_pct:.1f}% of rows are exact duplicates."
    worst_missing = data_quality.get("worst_missing_column")
    missing_line = ""
    if worst_missing and worst_missing.get("column"):
        missing_line = f"Column '{worst_missing.get('column')}' is {worst_missing.get('percentage')}% missing."

    fact_lines = [
        f"Margin signal: {margin}" if margin else "",
        f"Executive summary: {exec_summary}" if exec_summary else "",
        f"Key risk flagged: {risk}" if risk else "",
        f"Opportunity flagged: {opportunity}" if opportunity else "",
        f"Revenue efficiency: {revenue_eff}" if revenue_eff else "",
        ts_summary,
        cat_summary,
        outlier_line,
        f"Correlation note: {corr_line}" if corr_line else "",
        dupe_line,
        missing_line,
    ]
    facts = "\n".join(line for line in fact_lines if line)
    if not facts.strip():
        facts = "No strong signals were detected in this dataset — it's about as exciting as beige paint."

    voice = ROAST_PERSONALITY_VOICES.get(personality, ROAST_PERSONALITY_VOICES["brutalBoss"])

    return (
        f"Dataset: your dataset\n\n"
        f"{voice}\n\n"
        "Here are ALREADY-COMPUTED, aggregated analysis results for this dataset "
        "(these are summary metrics only — you are not being shown any raw rows):\n\n"
        f"{facts}\n\n"
        "TASK: Write a savage, funny, brutally honest \"data roast\" of these results.\n\n"
        "RULES (follow exactly):\n"
        "1. Roast the NUMBERS and TRENDS only — never the person, their intelligence, or their effort.\n"
        "2. 2-4 sentences MAXIMUM. Punchy, not rambling.\n"
        "3. No profanity, no slurs, no jokes about protected characteristics, no real company/brand "
        "names, no medical/legal/financial advice disguised as a joke.\n"
        "4. PG-13, genuinely funny — like a witty friend roasting a spreadsheet, not mean-spirited.\n"
        "5. Also give a 'score' 1-10 for how much this data deserves a roast "
        "(10 = brutally roastable/embarrassing numbers, 1 = actually solid, barely anything to roast).\n\n"
        "OUTPUT FORMAT — respond with ONLY this raw JSON object, nothing else:\n"
        '{"roast": "<2-4 sentence roast>", "score": <integer 1-10>}'
    )


def parse_roast_response(raw: str) -> dict:
    """Parses the model's JSON roast response, tolerating stray markdown
    fences the way sanitize_ai_code does for generated code. Raises on
    anything that doesn't yield usable roast text — the caller's retry
    loop handles that.
    """
    text = (raw or "").strip()

    if '```json' in text:
        start = text.find('```json') + len('```json')
        end = text.find('```', start)
        text = text[start: end if end != -1 else len(text)].strip()
    elif '```' in text:
        first_newline = text.find('\n')
        if first_newline != -1 and text[:first_newline].strip().startswith('```'):
            text = text[first_newline + 1:].strip()
        if text.endswith('```'):
            text = text[:-3].strip()

    parsed = json.loads(text)
    roast = str(parsed.get("roast", "")).strip()
    if not roast:
        raise ValueError("Empty roast text in AI response")

    try:
        score = int(parsed.get("score", 5))
    except (TypeError, ValueError):
        score = 5
    score = max(1, min(10, score))

    # Hard safety cap regardless of what the model produced — this is a
    # short punchline feature, not an essay, and caps the blast radius of
    # any prompt-injection-flavored attempt to get a long response out.
    if len(roast) > 600:
        roast = roast[:600].rsplit(' ', 1)[0].rstrip('.,;:') + "..."

    return {"roast": roast, "score": score}


def sanitize_error_for_ai(e: Exception) -> str:
    """Turn an exception into a message that's safe to echo back to the
    cloud AI provider in a retry prompt.

    Some pandas/numpy exceptions embed an actual cell value in their
    message -- e.g. `ValueError: could not convert string to float:
    'Jane Doe'` or a bad groupby key repeated back in a KeyError. Retry
    prompts get sent straight to the AI provider, so any quoted literal
    is replaced with a placeholder here. This keeps enough of the error
    shape for the model to still fix its own code (exception type +
    general message), without risking a real data value leaving the
    machine through an error message instead of through the intended
    schema/stats channel.
    """
    msg = f"{type(e).__name__}: {e}"
    msg = re.sub(r"'[^']*'", "'<value>'", msg)
    msg = re.sub(r'"[^"]*"', '"<value>"', msg)
    return msg


class NoApiKeyError(RuntimeError):
    """Distinguishable from a normal RuntimeError so callers (analyze/chat/
    roast routes) can tell "no key configured" apart from a transient model
    failure — the former should never be retried (it can't succeed) or
    silently swallowed into a fallback response, since that leaves the user
    looking at a fake result with no idea they need to add a key."""
    def __init__(self, provider: str):
        self.provider = provider
        super().__init__(
            f"No API key configured for '{provider}'. Add your API key in Settings before analyzing data."
        )


def require_provider_key(provider: str) -> None:
    if not has_api_key(provider):
        raise NoApiKeyError(provider)


def call_ai_model(prompt: str, provider: str = "openrouter", system_prompt: str | None = None, model_tier: str = "fast", max_tokens_override: int | None = None) -> str:
    provider = (provider or "openrouter").lower().strip()
    model_tier = (model_tier or "fast").lower().strip()
    if model_tier not in ("fast", "quality"):
        model_tier = "fast"
    api_key = get_api_key(provider)
    if not api_key:
        raise NoApiKeyError(provider)

    # Default system prompt targets code-generation callers (/api/analyze,
    # /api/chat). Callers that want plain-text output (e.g. /api/roast,
    # or the phase-2 narrative call in /api/analyze) pass their own
    # system_prompt so the model isn't told "output only code" while
    # being asked for a joke or a JSON object.
    effective_system_prompt = system_prompt or (
        "You are a Python data analyst. "
        "Output ONLY raw executable Python code. "
        "Never wrap code in markdown fences. "
        "Never add prose or explanations. "
        "The very first character of your response must be a Python identifier or #."
    )

    if provider == "openrouter":
        return _call_openrouter(prompt, api_key, effective_system_prompt, model_tier, max_tokens_override)
    elif provider == "openai":
        return _call_openai(prompt, api_key, effective_system_prompt, model_tier, max_tokens_override)
    elif provider == "anthropic":
        return _call_anthropic(prompt, api_key, effective_system_prompt, model_tier, max_tokens_override)
    elif provider == "google":
        return _call_google(prompt, api_key, effective_system_prompt, model_tier, max_tokens_override)
    else:
        raise RuntimeError(f"Unknown provider: '{provider}'.")


def _call_openrouter(prompt: str, api_key: str, effective_system_prompt: str, model_tier: str = "fast", max_tokens_override: int | None = None) -> str:

    if model_tier == "quality":
        # Quality tier bypasses the free fallback chain entirely and calls a
        # single named paid model through OpenRouter, billed against the
        # user's own OpenRouter balance. Re-verify this ID against
        # OpenRouter's live catalog periodically -- named model IDs go stale
        # (same reasoning as the free-tier list below), and OpenRouter's
        # naming mirrors whatever the underlying provider currently calls
        # its model. Overridable via OPENROUTER_MODEL_QUALITY for exactly
        # that reason.
        quality_model = os.environ.get("OPENROUTER_MODEL_QUALITY", "anthropic/claude-sonnet-5").strip()
        models = [quality_model]
    else:
        # Build ordered list of real model IDs to try. No filtering needed here —
        # openrouter/free is a real, officially documented OpenRouter router (it
        # auto-selects from whichever free models are currently live), not an
        # invalid meta-route as an earlier version of this code assumed. If the
        # user pastes something genuinely invalid, the retry loop below already
        # handles that gracefully by moving on to the next model.
        models_str = os.environ.get("OPENROUTER_MODELS", "")
        models = [m.strip() for m in models_str.split(",") if m.strip()]
        # Free-tier fallbacks, ordered strongest-for-code first. Re-verified
        # against OpenRouter's live catalog July 2026 — named free model IDs go
        # stale fast (e.g. qwen/qwen3-coder:free and poolside/laguna-m.1:free
        # both existed then got pulled within weeks). Rather than trying to keep
        # a hardcoded list perfectly current forever, this list ends with
        # openrouter/free — OpenRouter's own auto-router that always resolves to
        # whatever free models are actually live at request time — so even if
        # every named model above it eventually dies, the chain still works.
        # Users can override entirely via the OPENROUTER_MODELS env var.
        if not models:
            models = [
                "openai/gpt-oss-120b:free",                # strong current free coder (o3-mini-class on code evals)
                "google/gemma-4-31b-it:free",               # solid general-purpose, verified live July 2026
                "cohere/north-mini-code:free",               # agentic coding model, verified live July 2026
                "nvidia/nemotron-3-super-120b-a12b:free",   # large open MoE, verified live July 2026
                "openrouter/free",                          # self-healing catch-all — always resolves to a live free model
            ]

    max_attempts = 2
    import time

    for attempt in range(1, max_attempts + 1):
        last_error = None
        retry_delays = []

        for model in models:
            try:
                print(f"Trying model: {model} (Attempt {attempt}/{max_attempts})")
                payload = {
                    "model": model,
                    "messages": [
                        {
                            "role": "system",
                            "content": effective_system_prompt,
                        },
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.1,
                    # 2048 was tight enough that weaker/free models would get
                    # cut off mid-script on this schema, surfacing as a
                    # "syntax error" that was actually just truncation. Since
                    # the phase-1 chart-code prompt now asks for structured
                    # data only (no long prose), and the phase-2 narrative
                    # call passes its own small override, these defaults
                    # mainly cover the chart-code call and /api/chat.
                    "max_tokens": max_tokens_override if max_tokens_override else (6144 if model_tier == "quality" else 3072),
                }

                request_body = json.dumps(payload).encode("utf-8")
                api_request = urllib.request.Request(
                    "https://openrouter.ai/api/v1/chat/completions",
                    data=request_body,
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://wektor.local",
                        "X-Title": "Wektor AI",
                    },
                    method="POST",
                )

                with urllib.request.urlopen(api_request, timeout=120) as response:
                    response_data = json.loads(response.read().decode("utf-8"))

                choices = response_data.get("choices", [])
                if not choices:
                    raise RuntimeError(f"No choices in response from model {model}")

                content = choices[0].get("message", {}).get("content", "")
                if not content or not content.strip():
                    raise RuntimeError(f"Empty content from model {model}")

                print(f"Success with model: {model}")
                print("RAW AI CONTENT:")
                print(content)
                print("=" * 40)
                return content

            except urllib.error.HTTPError as e:
                # Read the actual error body so failures are never opaque
                try:
                    body = e.read().decode("utf-8", errors="replace")
                except Exception:
                    body = "(could not read response body)"

                # Check for 429 rate limits
                if e.code == 429:
                    delay = None
                    try:
                        # Try parsing from Retry-After header
                        header_val = e.headers.get("Retry-After") or e.headers.get("retry-after")
                        if header_val:
                            delay = float(header_val)
                    except Exception:
                        pass

                    try:
                        # Try parsing from response body JSON
                        data = json.loads(body)
                        meta = data.get("error", {}).get("metadata", {})
                        body_delay = meta.get("retry_after_seconds") or meta.get("retry_after_seconds_raw")
                        if body_delay is not None:
                            delay = float(body_delay)
                    except Exception:
                        pass

                    if delay is not None:
                        retry_delays.append(delay)

                last_error = RuntimeError(f"HTTP {e.code} from {model}: {body[:400]}")
                print(f"Model {model} failed: HTTP {e.code} - {body[:400]}")
                continue
            except Exception as e:
                last_error = e
                print(f"Model {model} failed: {e}")
                continue

        # If we completed the models loop and hit rate limits, and have more attempts left, wait and retry.
        if attempt < max_attempts and retry_delays:
            # Sleep for the minimum suggested delay, capped at 10 seconds.
            sleep_time = min(retry_delays)
            # Ensure it is a sane number
            if sleep_time <= 0 or sleep_time > 60:
                sleep_time = 5.0
            sleep_time = min(sleep_time, 10.0)
            print(f"All models returned 429 rate limits. Waiting {sleep_time:.2f} seconds before retrying (Attempt {attempt} completed)...")
            time.sleep(sleep_time)
        else:
            break

    # All models failed — raise so caller can fall back to pandas
    raise RuntimeError(f"All AI models failed. Last error: {last_error}")


# Unlike OpenRouter (which fans out across a fallback list of free models),
# these three call a single configured model directly against the
# provider's own API — that's the whole point of picking them over
# OpenRouter: a real account with real quota, not a shared free tier.
# Model names are configurable via env vars for the same reason
# OPENROUTER_MODELS is: model names go stale, and this code shouldn't need
# to be edited every time a provider ships a new one.

def _call_openai(prompt: str, api_key: str, effective_system_prompt: str, model_tier: str = "fast", max_tokens_override: int | None = None) -> str:
    # Defaults refreshed Aug 2026 to the GPT-5.6 family (Sol/Terra/Luna),
    # confirmed against OpenAI's own API docs. gpt-4o-mini predates this
    # family entirely -- same staleness problem OPENROUTER_MODELS already
    # has, same fix: env var override, re-verify periodically.
    env_var = "OPENAI_MODEL_QUALITY" if model_tier == "quality" else "OPENAI_MODEL"
    default_model = "gpt-5.6-sol" if model_tier == "quality" else "gpt-5.6-luna"
    model = os.environ.get(env_var, default_model).strip()
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": effective_system_prompt},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.1,
        "max_tokens": max_tokens_override if max_tokens_override else (6144 if model_tier == "quality" else 3072),
    }
    api_request = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(api_request, timeout=120) as response:
            response_data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI HTTP {e.code} ({model}): {body[:400]}")

    choices = response_data.get("choices", [])
    if not choices:
        raise RuntimeError(f"No choices in response from OpenAI ({model})")
    content = choices[0].get("message", {}).get("content", "")
    if not content or not content.strip():
        raise RuntimeError(f"Empty content from OpenAI ({model})")
    print(f"Success with OpenAI model: {model}")
    return content


def _call_anthropic(prompt: str, api_key: str, effective_system_prompt: str, model_tier: str = "fast", max_tokens_override: int | None = None) -> str:
    env_var = "ANTHROPIC_MODEL_QUALITY" if model_tier == "quality" else "ANTHROPIC_MODEL"
    default_model = "claude-sonnet-5" if model_tier == "quality" else "claude-haiku-4-5-20251001"
    model = os.environ.get(env_var, default_model).strip()
    payload = {
        "model": model,
        "max_tokens": max_tokens_override if max_tokens_override else (6144 if model_tier == "quality" else 3072),
        "temperature": 0.1,
        "system": effective_system_prompt,
        "messages": [{"role": "user", "content": prompt}],
    }
    api_request = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(api_request, timeout=120) as response:
            response_data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Anthropic HTTP {e.code} ({model}): {body[:400]}")

    blocks = response_data.get("content", [])
    text_blocks = [b.get("text", "") for b in blocks if b.get("type") == "text"]
    content = "".join(text_blocks)
    if not content or not content.strip():
        raise RuntimeError(f"Empty content from Anthropic ({model})")
    print(f"Success with Anthropic model: {model}")
    return content


def _call_google(prompt: str, api_key: str, effective_system_prompt: str, model_tier: str = "fast", max_tokens_override: int | None = None) -> str:
    # Note on the quality-tier default: Google's model naming is moving
    # unusually fast right now -- multiple "current" Flash version numbers
    # (3.5, 3.6, 3.7) were all cited as latest within a few weeks of each
    # other in sources checked Aug 2026. Rather than gamble on pinning an
    # exact new-generation number that may already be stale by ship time,
    # this stays on the same 2.5 generation as the existing verified-good
    # fast-tier default and just switches flash->pro, which is Google's
    # long-established, stable naming convention for the cost/quality split.
    # Override via GOOGLE_MODEL_QUALITY once you've confirmed the current
    # generation directly against https://ai.google.dev/gemini-api/docs/models
    env_var = "GOOGLE_MODEL_QUALITY" if model_tier == "quality" else "GOOGLE_MODEL"
    default_model = "gemini-2.5-pro" if model_tier == "quality" else "gemini-2.5-flash"
    model = os.environ.get(env_var, default_model).strip()
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "systemInstruction": {"parts": [{"text": effective_system_prompt}]},
        "generationConfig": {"temperature": 0.1, "maxOutputTokens": max_tokens_override if max_tokens_override else (6144 if model_tier == "quality" else 3072)},
    }
    # API key goes in a header, not the URL query string — avoids the key
    # ending up in any logging/error output that happens to include the
    # request URL (e.g. a proxy access log or an HTTPError's .url attribute).
    api_request = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-goog-api-key": api_key,
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(api_request, timeout=120) as response:
            response_data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Google HTTP {e.code} ({model}): {body[:400]}")

    candidates = response_data.get("candidates", [])
    if not candidates:
        raise RuntimeError(f"No candidates in response from Google ({model})")
    parts = candidates[0].get("content", {}).get("parts", [])
    content = "".join(p.get("text", "") for p in parts)
    if not content or not content.strip():
        raise RuntimeError(f"Empty content from Google ({model})")
    print(f"Success with Google model: {model}")
    return content

def make_json_serializable(obj):
    """Recursively convert any object to a JSON-serializable form."""
    # Handle scalar NA/NaN values FIRST — must come before the numpy
    # int/float checks below, since np.floating(nan) would otherwise match
    # that check and be returned as a raw Python float('nan') before ever
    # reaching this conversion. A literal NaN in the JSON response body is
    # invalid per the JSON spec; JavaScript's JSON.parse (used internally
    # by fetch's response.json()) throws a SyntaxError on it, which breaks
    # the frontend even though the Flask backend returns a clean 200.
    try:
        if pd.api.types.is_scalar(obj) and pd.isna(obj):
            return None
    except (TypeError, ValueError):
        pass

    # numpy scalars
    if isinstance(obj, (np.integer,)):
        return int(obj)
    if isinstance(obj, (np.floating,)):
        return float(obj)
    if isinstance(obj, np.bool_):
        return bool(obj)

    # Handle numpy arrays and pandas series/indexes first
    if isinstance(obj, (np.ndarray, pd.Series, pd.Index)):
        return [make_json_serializable(x) for x in obj]

    if isinstance(obj, (pd.Timestamp, pd.DatetimeIndex)):
        return str(obj)
    if isinstance(obj, pd.Interval):
        return str(obj)
    if isinstance(obj, (list, tuple)):
        return [make_json_serializable(x) for x in obj]
    if isinstance(obj, dict):
        return {make_json_serializable(k): make_json_serializable(v) for k, v in obj.items()}
    if isinstance(obj, (int, float, str, bool, type(None))):
        return obj
    # Convert everything else to string
    return str(obj)

def pick_local_value(local_vars: dict, *keys: str, default: str = "Awaiting data...") -> str:
    placeholders = {
        "",
        "n/a",
        "na",
        "pending",
        "awaiting data",
        "awaiting data...",
        "awaiting data upload...",
    }
    for key in keys:
        if key not in local_vars:
            continue
        value = local_vars[key]
        if value is None:
            continue
        if isinstance(value, (dict, list, tuple, set)):
            continue
        text = str(value).strip()
        if text.lower() in placeholders:
            continue
        return text
    return default

def harvest_nested_metrics(local_vars: dict) -> dict:
    harvested: dict[str, str] = {}
    alias_map = {
        "margin_signal": "margin",
        "margin": "margin",
        "marginsignal": "margin",
        "exec_summary": "executiveSummary",
        "executive_summary": "executiveSummary",
        "executivesummary": "executiveSummary",
        "summary": "executiveSummary",
        "analysis": "executiveSummary",
        "risk_text": "risk_statement",
        "risk": "risk_statement",
        "riskstatement": "risk_statement",
        "opp_text": "opportunity_statement",
        "opportunity": "opportunity_statement",
        "opportunity_statement": "opportunity_statement",
        "opportunitystatement": "opportunity_statement",
        "opp": "opportunity_statement",
        "revenue_efficiency": "revenueEfficiency",
        "revenueefficiency": "revenueEfficiency",
        "what_changed_text": "what_changed",
        "what_changed": "what_changed",
        "whatchanged": "what_changed",
        "why_changed_text": "why_changed",
        "why_changed": "why_changed",
        "whychanged": "why_changed",
        "action_text": "action_playbook",
        "action_playbook": "action_playbook",
        "actionplaybook": "action_playbook",
        "action": "action_playbook"
    }

    for key, value in local_vars.items():
        if key == "df" or isinstance(value, pd.DataFrame):
            continue
        if isinstance(value, dict):
            for nested_key, nested_value in value.items():
                normalized_key = str(nested_key).strip().lower().replace("-", "_")
                target = alias_map.get(normalized_key)
                if target and nested_value is not None and not isinstance(nested_value, (dict, list, tuple, set)):
                    harvested[target] = str(nested_value).strip()
            continue
        normalized_key = str(key).strip().lower().replace("-", "_")
        target = alias_map.get(normalized_key)
        if target and value is not None and not isinstance(value, (dict, list, tuple, set)):
            harvested[target] = str(value).strip()
    return harvested

def generate_fallback_data(df: pd.DataFrame) -> dict:
    """Generate ROBUST, USEFUL fallback data from the actual DataFrame"""
    total_rows = len(df)
    total_cols = len(df.columns)
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    object_cols = df.select_dtypes(include=['object', 'string']).columns.tolist()
    
    # Find date columns properly
    date_cols = []
    for col in df.columns:
        try:
            test_series = pd.to_datetime(df[col].dropna(), errors='coerce')
            if len(test_series) > 0 and test_series.notna().sum() / len(test_series) > 0.5:
                date_cols.append(col)
        except:
            continue

    # --- 1. Time Series Data ---
    time_series_data = []
    if date_cols:
        try:
            dt_col = date_cols[0]
            temp_df = df.copy()
            temp_df[dt_col] = pd.to_datetime(temp_df[dt_col])
            temp_df['date_month'] = temp_df[dt_col].dt.to_period('M').astype(str)
            
            if numeric_cols:
                agg = temp_df.groupby('date_month')[numeric_cols[0]].mean().reset_index()
                time_series_data = []
                for _, row in agg.iterrows():
                    val = row[numeric_cols[0]]
                    # Handle possible Timestamp or other non-numeric types
                    try:
                        float_val = float(val)
                    except:
                        float_val = 0.0
                    time_series_data.append({
                        "time": str(row['date_month']), 
                        "value": float_val
                    })
            else:
                agg = temp_df.groupby('date_month').size().reset_index(name='count')
                time_series_data = [
                    {"time": str(row['date_month']), "value": int(row['count'])} 
                    for _, row in agg.iterrows()
                ]
        except Exception as e:
            print(f"Date fallback failed: {e}")
            time_series_data = []
    
    # If no date data, use first 15 rows with numeric data
    if not time_series_data:
        num_samples = min(15, total_rows)
        for i in range(num_samples):
            val = i + 1
            if numeric_cols:
                try:
                    val = float(df[numeric_cols[0]].iloc[i]) if pd.notna(df[numeric_cols[0]].iloc[i]) else 0.0
                except:
                    pass
            time_series_data.append({
                "time": f"Sample {i+1}",
                "value": val
            })

    # --- 2. Category Data ---
    category_data = []
    if object_cols:
        try:
            cat_col = object_cols[0]
            cat_counts = df[cat_col].value_counts().head(5)
            for cat, count in cat_counts.items():
                category_data.append({"category": str(cat), "count": int(count)})
        except:
            category_data = [{"category": "Data", "count": total_rows}]
    elif numeric_cols:
        try:
            num_col = numeric_cols[0]
            binned = pd.cut(df[num_col], bins=5)
            bin_counts = binned.value_counts().sort_index()
            category_data = [
                {"category": f"Range {i+1}", "count": int(v)} 
                for i, v in enumerate(bin_counts)
            ]
        except:
            category_data = [{"category": "Data", "count": total_rows}]
    else:
        category_data = [{"category": "Records", "count": total_rows}]

    # --- 3. Distribution Data ---
    distribution_data = []
    if numeric_cols:
        try:
            num_col = numeric_cols[0]
            binned = pd.cut(df[num_col], bins=4, labels=["Low", "Medium", "High", "Very High"])
            bin_counts = binned.value_counts().sort_index()
            distribution_data = [
                {"name": str(k), "value": int(v)} 
                for k, v in bin_counts.items()
            ]
        except:
            distribution_data = category_data[:4]  # Use top 4 categories
    else:
        distribution_data = category_data[:4]

    # --- Explanations ---
    if date_cols:
        time_series_explanation = f"Trends by month using '{date_cols[0]}' column, showing changes over time."
    else:
        time_series_explanation = "Shows values from the first 15 data samples."
    
    if object_cols:
        category_explanation = f"Top categories from '{object_cols[0]}' column, showing which items appear most often."
    else:
        category_explanation = "Distribution of values by range in the numeric column."
    
    if numeric_cols:
        distribution_explanation = f"How values are distributed in '{numeric_cols[0]}', grouped into 4 simple ranges."
    else:
        distribution_explanation = "Simple distribution of the main categories."

    return {
        "time_series_data": time_series_data,
        "category_data": category_data,
        "distribution_data": distribution_data,
        "time_series_explanation": time_series_explanation,
        "category_explanation": category_explanation,
        "distribution_explanation": distribution_explanation
    }

def generate_fallback_metrics(df: pd.DataFrame):
    """Generate ACTUAL, USEFUL metrics from the DataFrame"""
    total_rows = len(df)
    total_cols = len(df.columns)
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    object_cols = df.select_dtypes(include=['object', 'string']).columns.tolist()
    
    # --- Margin Signal ---
    margin = f"{total_rows} records loaded"
    if numeric_cols:
        num_col = numeric_cols[0]
        mean_val = df[num_col].mean()
        median_val = df[num_col].median()
        min_val = df[num_col].min()
        max_val = df[num_col].max()
        
        margin = f"Average {num_col}: {mean_val:.2f} (range: {min_val:.2f} to {max_val:.2f})"
    
    # --- Executive Summary ---
    exec_summary = f"This dataset has {total_rows} entries and {total_cols} columns. "
    if numeric_cols:
        exec_summary += f"There are {len(numeric_cols)} numeric fields for analysis. "
    if object_cols:
        exec_summary += f"There are {len(object_cols)} categorical/text fields to explore. "
    exec_summary += "The trends tab contains visualizations of key patterns in this data."
    
    # --- Risk & Opportunity ---
    risk_text = "No immediate high-risk patterns detected. Always verify insights with the full dataset."
    opp_text = "Look at the trends tab to find patterns. Consider filtering or grouping the data to dive deeper."

    # --- Diagnostics What, Why, Action ---
    what_changed_text = f"Dataset loaded successfully containing {total_rows} records. Primary metrics initialized."
    why_changed_text = "No shifts detected since this is a baseline upload. Causal drivers have not been simulated yet."
    action_text = "Check the deep dive tab for outliers or ask specific questions in the briefing panel."
    
    revenue_eff = f"Dataset size: {total_rows} rows"
    
    return margin, exec_summary, risk_text, opp_text, revenue_eff, what_changed_text, why_changed_text, action_text


def _looks_like_row_index(series: pd.Series, col_name: str) -> bool:
    """True if `series` is a leaked pandas row index rather than a real
    measurement — e.g. a CSV exported with `index=True` produces a column
    literally named 'Unnamed: 0' whose values are just 0..n-1. Picking a
    column like this as an "outlier column" or "correlation target"
    produces technically-real but analytically meaningless output (a row
    number correlated against anything is ~0 by construction) — exactly
    the kind of narrative/chart mismatch that erodes first-time-user trust.
    Confirmed via testing: the real NHANES demo dataset has exactly this
    column as its first numeric field.
    """
    name_lower = str(col_name).strip().lower()
    if name_lower == "index" or re.match(r"^unnamed:\s*\d+$", name_lower):
        return True
    non_null = series.dropna().reset_index(drop=True)
    if len(non_null) < 3:
        return False
    # A perfectly sequential column (constant step of 1) is a row index
    # regardless of what it's named.
    diffs = non_null.diff().dropna()
    return len(diffs) > 0 and bool((diffs == 1).all())


def _select_analysis_numeric_cols(df: pd.DataFrame, numeric_cols: list) -> list:
    """Numeric columns worth analyzing, with leaked row-index columns
    filtered out — but if filtering would remove everything (a dataset
    that genuinely only has an index-like numeric column), fall back to
    the original list rather than losing the section entirely."""
    filtered = [c for c in numeric_cols if not _looks_like_row_index(df[c], c)]
    return filtered if filtered else numeric_cols


def generate_deep_dive_data(df: pd.DataFrame):
    """Generate deep dive data including outliers, correlations, and categorical analysis"""
    # Limit to 10000 rows max for performance
    max_rows = 10000
    if len(df) > max_rows:
        df = df.head(max_rows).copy()
    
    total_rows = len(df)
    numeric_cols_all = df.select_dtypes(include=['number']).columns.tolist()
    numeric_cols = _select_analysis_numeric_cols(df, numeric_cols_all)
    object_cols = df.select_dtypes(include=['object', 'string']).columns.tolist()
    
    deep_dive = {}
    
    # --- 1. Outlier Detection ---
    if numeric_cols:
        num_col = numeric_cols[0]
        q1 = df[num_col].quantile(0.25)
        q3 = df[num_col].quantile(0.75)
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        # Use vectorized operations instead of iterrows for speed
        outlier_mask = (df[num_col] < lower_bound) | (df[num_col] > upper_bound)
        
        outliers = []
        outlier_list = []
        for i in range(total_rows):
            val = df[num_col].iloc[i]
            if pd.isna(val):
                continue
            is_outlier = outlier_mask.iloc[i]
            # Keep scatter data simple
            outliers.append({
                "x": i,
                "y": float(val),
                "is_outlier": bool(is_outlier),
                "label": f"Value: {val:.2f}"
            })
            if is_outlier:
                outlier_list.append({
                    "index": int(df.index[i]) if hasattr(df, "index") else i,
                    "value": float(val)
                })
        
        deep_dive["outliers"] = outliers
        deep_dive["outlier_column"] = num_col
        outlier_count = int(outlier_mask.sum())
        deep_dive["total_outliers"] = outlier_count
        deep_dive["outlier_percentage"] = float((outlier_count / total_rows) * 100) if total_rows > 0 else 0.0
        deep_dive["outlier_list"] = outlier_list[:15]  # Limit to top 15 outlier entries for the UI table
        deep_dive["outlier_explanation"] = f"Outlier detection using IQR method. Found {outlier_count} potential outliers in {num_col}."
    else:
        deep_dive["outlier_explanation"] = "No numeric columns available for outlier detection."
        deep_dive["total_outliers"] = 0
        deep_dive["outlier_percentage"] = 0.0
        deep_dive["outlier_list"] = []
    
    # --- 2. Correlation Analysis ---
    if len(numeric_cols) >= 2:
        corr_matrix = df[numeric_cols].corr()
        # Take first column correlations with others
        corr_labels = []
        corr_values = []
        first_col = numeric_cols[0]
        for col in numeric_cols[1:]:
            corr_labels.append(f"{first_col} vs {col}")
            corr_values.append(float(corr_matrix.loc[first_col, col]))
        
        deep_dive["correlations"] = {
            "labels": corr_labels,
            "values": corr_values
        }
        deep_dive["correlation_target"] = first_col
        strong_pos = [lab for lab, val in zip(corr_labels, corr_values) if val > 0.5]
        strong_neg = [lab for lab, val in zip(corr_labels, corr_values) if val < -0.5]
        if strong_pos:
            deep_dive["correlation_explanation"] = f"Strong positive correlations: {', '.join(strong_pos)}."
        elif strong_neg:
            deep_dive["correlation_explanation"] = f"Strong negative correlations: {', '.join(strong_neg)}."
        else:
            deep_dive["correlation_explanation"] = "No strong correlations found between numeric variables."
    else:
        deep_dive["correlation_explanation"] = "Need at least two numeric columns for correlation analysis."
        deep_dive["correlations"] = {"labels": [], "values": []}
        deep_dive["correlation_target"] = ""
    
    # --- 3. Categorical Deep Dive ---
    if len(object_cols) >= 1:
        cat_col_1 = object_cols[0]
        cat_counts_1 = df[cat_col_1].value_counts().head(8)
        deep_dive["categorical_1"] = [{"category": str(cat), "count": int(cnt)} for cat, cnt in zip(cat_counts_1.index, cat_counts_1.values)]
        deep_dive["categorical_1_column"] = cat_col_1
        
        if len(object_cols) >= 2:
            cat_col_2 = object_cols[1]
            cat_counts_2 = df[cat_col_2].value_counts().head(8)
            deep_dive["categorical_2"] = [{"category": str(cat), "count": int(cnt)} for cat, cnt in zip(cat_counts_2.index, cat_counts_2.values)]
            deep_dive["categorical_2_column"] = cat_col_2
            deep_dive["categorical_explanation"] = f"Top categories in {cat_col_1} and {cat_col_2}."
        else:
            deep_dive["categorical_explanation"] = f"Top categories in {cat_col_1}."
    else:
        deep_dive["categorical_explanation"] = "No categorical columns available."
        deep_dive["categorical_1"] = []
        deep_dive["categorical_2"] = []
    
    return deep_dive

def execute_chart_code(df: pd.DataFrame, ai_code: str) -> dict:
    """Phase 1 result: chart data, chart explanations, deep_dive_data, and
    the computed_stats dict that phase 2 (the narrative call) will turn
    into prose. This is the ONLY half that touches the sandbox — the
    narrative call downstream never executes anything.

    Returns a dict with keys: chart_data, chart_explanations,
    computed_stats, deep_dive_data. Raises RuntimeError on sandbox
    failure so the /api/analyze retry loop can ask the AI to fix its own
    code, same behavior as before the split.
    """
    fallback = generate_fallback_data(df)
    deep_dive_fb = generate_deep_dive_data(df)

    if not ai_code:
        print("No AI code received, using fallback chart data")
        return {
            "chart_data": {
                "time_series_data": fallback["time_series_data"],
                "category_data": fallback["category_data"],
                "distribution_data": fallback["distribution_data"]
            },
            "chart_explanations": {
                "time_series_explanation": fallback["time_series_explanation"],
                "category_explanation": fallback["category_explanation"],
                "distribution_explanation": fallback["distribution_explanation"]
            },
            "computed_stats": {},
            "deep_dive_data": deep_dive_fb
        }

    print("=" * 50)
    print("AI CHART CODE TO EXECUTE:")
    try:
        # Try to print normally first
        print(ai_code)
    except UnicodeEncodeError:
        # On Windows, replace problematic characters
        print(ai_code.encode('utf-8', errors='replace').decode('ascii', errors='replace'))
    print("=" * 50)

    # Sandboxed execution — isolated process, restricted builtins, hard timeout.
    ok, local_vars, sandbox_error = run_sandboxed(ai_code, df, timeout_seconds=25)
    local_vars["df"] = df  # some downstream code below expects df in local_vars

    if ok:
        print("AI chart code executed successfully (sandboxed)")
    else:
        print(f"AI chart code execution failed: {sandbox_error}")
        # Raise instead of silently falling back — this lets the retry loop
        # in /api/analyze catch it and ask the AI to fix its own code,
        # instead of quietly serving generic fallback stats on the very
        # first sandbox failure.
        raise RuntimeError(f"Sandboxed execution failed: {sandbox_error}")

    time_series_data = local_vars.get("time_series_data") or fallback["time_series_data"]
    category_data = local_vars.get("category_data") or fallback["category_data"]
    distribution_data = local_vars.get("distribution_data") or fallback["distribution_data"]
    time_series_explanation = pick_local_value(local_vars, "time_series_explanation", default=fallback["time_series_explanation"])
    category_explanation = pick_local_value(local_vars, "category_explanation", default=fallback["category_explanation"])
    distribution_explanation = pick_local_value(local_vars, "distribution_explanation", default=fallback["distribution_explanation"])

    computed_stats = local_vars.get("computed_stats")
    if not isinstance(computed_stats, dict):
        computed_stats = {}

    deep_dive_data = local_vars.get("deep_dive_data") or deep_dive_fb

    return {
        "chart_data": {
            "time_series_data": time_series_data,
            "category_data": category_data,
            "distribution_data": distribution_data
        },
        "chart_explanations": {
            "time_series_explanation": time_series_explanation,
            "category_explanation": category_explanation,
            "distribution_explanation": distribution_explanation
        },
        "computed_stats": computed_stats,
        "deep_dive_data": deep_dive_data
    }


def assemble_metrics(chart_result: dict, narrative: dict | None, df: pd.DataFrame) -> dict:
    """Merge phase-1 (chart_result, from execute_chart_code) and phase-2
    (narrative, a plain dict parsed from the JSON narrative call — or
    None if that call/parse failed) into the exact same output shape the
    frontend has always expected. Falls back to generate_fallback_metrics()
    text per-field, independently, so a narrative-call failure never
    blanks out chart data that already executed successfully, and vice
    versa — each half degrades gracefully on its own.
    """
    margin_fb, exec_fb, risk_fb, opp_fb, rev_fb, what_fb, why_fb, action_fb = generate_fallback_metrics(df)
    narrative = narrative or {}

    margin = narrative.get("margin_signal") or margin_fb
    executive_summary = narrative.get("exec_summary") or exec_fb
    risk_statement = narrative.get("risk_text") or risk_fb
    opportunity_statement = narrative.get("opp_text") or opp_fb
    what_changed = narrative.get("what_changed_text") or what_fb
    why_changed = narrative.get("why_changed_text") or why_fb
    action_playbook = narrative.get("action_text") or action_fb
    revenue_efficiency = rev_fb  # never part of the AI schema; always the deterministic fallback

    return {
        "margin": margin,
        "margin_signal": margin,
        "executiveSummary": executive_summary,
        "executive_summary": executive_summary,
        "exec_summary": executive_summary,
        "risk_statement": risk_statement,
        "risk": risk_statement,
        "risk_text": risk_statement,
        "opportunity_statement": opportunity_statement,
        "opportunity": opportunity_statement,
        "opp_text": opportunity_statement,
        "revenueEfficiency": revenue_efficiency,
        "what_changed": what_changed,
        "why_changed": why_changed,
        "action_playbook": action_playbook,
        "chart_data": chart_result["chart_data"],
        "chart_explanations": chart_result["chart_explanations"],
        "deep_dive_data": chart_result["deep_dive_data"]
    }

def build_schema_description(df: pd.DataFrame) -> str:
    """Describe the dataset to the AI using ONLY column names, coarse
    types, and aggregate statistics (min/max/mean for numeric columns,
    unique-value counts for categorical columns, date ranges for date
    columns) — never actual row values. This is what backs Wektor's
    privacy claim: the cloud LLM only ever sees shape/schema-level
    metadata derived from your data, never a real record.
    """
    lines = []
    for col in df.columns:
        series = df[col]
        dtype = series.dtype
        non_null = series.dropna()

        if pd.api.types.is_datetime64_any_dtype(dtype):
            kind = "date"
        elif pd.api.types.is_numeric_dtype(dtype):
            kind = "numeric"
        else:
            kind = "categorical"
            if len(non_null) > 0:
                try:
                    parsed = pd.to_datetime(non_null.head(20), errors="coerce")
                    if parsed.notna().sum() / len(parsed) > 0.7:
                        kind = "date"
                except Exception:
                    pass

        detail = ""
        try:
            if kind == "numeric" and len(non_null) > 0:
                detail = f" (min={non_null.min():.2f}, max={non_null.max():.2f}, mean={non_null.mean():.2f})"
            elif kind == "date" and len(non_null) > 0:
                parsed = pd.to_datetime(non_null, errors="coerce").dropna()
                if len(parsed) > 0:
                    detail = f" (range: {parsed.min().date()} to {parsed.max().date()})"
            elif kind == "categorical":
                detail = f" ({non_null.nunique()} unique values)"
        except Exception:
            pass

        total = len(series)
        null_pct = (1 - len(non_null) / total) * 100 if total > 0 else 0
        null_note = f", {null_pct:.0f}% missing" if null_pct > 0 else ""

        lines.append(f"  - {col}: {kind}{detail}{null_note}")

    return "\n".join(lines)


def compute_data_quality(df: pd.DataFrame) -> dict:
    """Duplicate-row and missing-value summary — purely aggregate counts,
    never row values. This is what powers the template-based Data Roast's
    "data quality" checks (missing values, duplicates) without needing an
    AI call — same privacy guarantee as everything else here.
    """
    total_rows = len(df)
    if total_rows == 0 or len(df.columns) == 0:
        return {
            "duplicate_count": 0,
            "duplicate_percentage": 0.0,
            "worst_missing_column": None,
            "avg_missing_percentage": 0.0,
            "columns_with_missing": [],
        }

    try:
        duplicate_count = int(df.duplicated().sum())
    except Exception:
        duplicate_count = 0
    duplicate_percentage = (duplicate_count / total_rows) * 100 if total_rows else 0.0

    columns_with_missing = []
    for col in df.columns:
        try:
            non_null = int(df[col].notna().sum())
        except Exception:
            non_null = total_rows
        pct = (1 - non_null / total_rows) * 100 if total_rows else 0.0
        if pct > 0:
            columns_with_missing.append({"column": str(col), "percentage": round(float(pct), 1)})

    columns_with_missing.sort(key=lambda x: x["percentage"], reverse=True)
    worst_missing_column = columns_with_missing[0] if columns_with_missing else None
    avg_missing_percentage = (
        sum(m["percentage"] for m in columns_with_missing) / len(df.columns) if len(df.columns) else 0.0
    )

    return {
        "duplicate_count": duplicate_count,
        "duplicate_percentage": round(float(duplicate_percentage), 2),
        "worst_missing_column": worst_missing_column,
        "avg_missing_percentage": round(float(avg_missing_percentage), 2),
        "columns_with_missing": columns_with_missing[:5],
    }


def get_column_schema(df: pd.DataFrame) -> list:
    """Column names + a coarse type classification ONLY — never row values.
    This lets the frontend offer real column names for Column Mapping
    without the underlying data ever leaving the backend, and without
    calling the AI at all.
    """
    schema = []
    for col in df.columns:
        dtype = df[col].dtype
        if pd.api.types.is_datetime64_any_dtype(dtype):
            kind = "date"
        elif pd.api.types.is_numeric_dtype(dtype):
            kind = "numeric"
        else:
            kind = "categorical"
            try:
                sample = df[col].dropna().head(20)
                if len(sample) > 0:
                    parsed = pd.to_datetime(sample, errors="coerce")
                    if parsed.notna().sum() / len(sample) > 0.7:
                        kind = "date"
            except Exception:
                pass
        schema.append({"name": str(col), "type": kind})
    return schema


def compute_remapped_chart_data(df: pd.DataFrame, time_col: str | None, category_col: str | None, value_col: str | None) -> dict:
    """Deterministic, non-AI re-aggregation of the FULL dataset against
    user-chosen columns from the Column Mapping card. This is a plain
    pandas groupby — no LLM call and no sandbox needed, since it's fixed
    arithmetic aggregation rather than arbitrary generated code.
    """
    result = {
        "time_series_data": [],
        "category_data": [],
        "distribution_data": [],
        "time_series_explanation": "",
        "category_explanation": "",
        "distribution_explanation": "",
    }

    has_value = bool(value_col) and value_col in df.columns and pd.api.types.is_numeric_dtype(df[value_col])

    # --- Time series: group by time_col, aggregate value_col (mean) ---
    if time_col and time_col in df.columns:
        try:
            cols_needed = [time_col] + ([value_col] if has_value else [])
            temp = df[cols_needed].copy()
            parsed = pd.to_datetime(temp[time_col], errors="coerce")
            if len(temp) > 0 and parsed.notna().sum() / len(temp) > 0.5:
                temp["_bucket"] = parsed.dt.to_period("M").astype(str)
            else:
                temp["_bucket"] = temp[time_col].astype(str)

            if has_value:
                agg = temp.groupby("_bucket")[value_col].mean().reset_index().sort_values("_bucket").head(24)
                result["time_series_data"] = [
                    {"time": str(r["_bucket"]), "value": float(r[value_col]) if pd.notna(r[value_col]) else 0.0}
                    for _, r in agg.iterrows()
                ]
                result["time_series_explanation"] = f"Average {value_col} grouped by {time_col}."
            else:
                agg = temp.groupby("_bucket").size().reset_index(name="count").sort_values("_bucket").head(24)
                result["time_series_data"] = [
                    {"time": str(r["_bucket"]), "value": int(r["count"])} for _, r in agg.iterrows()
                ]
                result["time_series_explanation"] = f"Record count grouped by {time_col}."
        except Exception as e:
            print(f"[remap] time series aggregation failed: {e}")

    # --- Category: group by category_col, aggregate value_col (sum) or count ---
    if category_col and category_col in df.columns:
        try:
            if has_value:
                agg = df.groupby(category_col)[value_col].sum().sort_values(ascending=False).head(8)
                result["category_data"] = [
                    {"category": str(k), "count": float(v) if pd.notna(v) else 0.0} for k, v in agg.items()
                ]
                result["category_explanation"] = f"Total {value_col} by {category_col}, top {len(result['category_data'])}."
            else:
                agg = df[category_col].value_counts().head(8)
                result["category_data"] = [{"category": str(k), "count": int(v)} for k, v in agg.items()]
                result["category_explanation"] = f"Record count by {category_col}, top {len(result['category_data'])}."
        except Exception as e:
            print(f"[remap] category aggregation failed: {e}")

    # --- Distribution: bin value_col into 4 ranges ---
    if has_value:
        try:
            binned = pd.cut(df[value_col].dropna(), bins=4, labels=["Low", "Medium", "High", "Very High"])
            bin_counts = binned.value_counts().sort_index()
            result["distribution_data"] = [{"name": str(k), "value": int(v)} for k, v in bin_counts.items()]
            result["distribution_explanation"] = f"Distribution of {value_col} across 4 ranges."
        except Exception as e:
            print(f"[remap] distribution aggregation failed: {e}")

    return result


MAX_UPLOAD_FILE_MB = 200
MAX_COLUMNS = 2000

# Directories no legitimate dataset should live in — the LOCAL_AUTH_TOKEN +
# CORS restriction to 127.0.0.1:5005 is the primary defense against a
# malicious webpage hitting this local API, but this is a cheap extra
# layer: even a request that got past that shouldn't be able to point
# `filePath` at OS config/credential locations.
_SENSITIVE_PATH_PREFIXES = (
    "/etc/", "/private/etc/", "/System/", "/Library/Keychains/",
    "C:\\Windows\\", "C:\\ProgramData\\",
)


def _validate_file_path_safety(file_path: str) -> None:
    real_path = os.path.realpath(file_path)
    for prefix in _SENSITIVE_PATH_PREFIXES:
        if real_path.lower().startswith(prefix.lower()):
            raise ValueError("This file path is not allowed.")
    if not os.path.isfile(real_path):
        raise ValueError("Path does not point to a regular file.")


def _validate_file_signature(file_path: str) -> None:
    """Lightweight magic-byte sanity check — NOT malware scanning, just
    catches a disguised or corrupted file before pandas tries to parse it
    (e.g. an executable renamed to .csv, or a non-Excel file renamed to
    .xlsx), so it fails fast with a clear message instead of behaving
    unpredictably downstream.
    """
    ext = os.path.splitext(file_path)[1].lower()
    try:
        with open(file_path, "rb") as f:
            head = f.read(8)
    except OSError as e:
        raise ValueError(f"Could not read file: {e}")

    if ext in (".xlsx", ".xls"):
        # Modern .xlsx (and .xls saved as OOXML) are zip archives -> "PK\x03\x04".
        # Legacy binary .xls (OLE2 format) starts with this fixed 8-byte signature.
        is_zip = head[:4] == b"PK\x03\x04"
        is_ole2 = head[:8] == b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"
        if not (is_zip or is_ole2):
            raise ValueError(
                f"'{os.path.basename(file_path)}' doesn't look like a valid Excel "
                "file (signature mismatch) — it may be corrupted or mislabeled."
            )
    elif ext == ".csv":
        # CSVs are plain text — reject anything whose header looks like a
        # binary executable or archive disguised with a .csv extension.
        binary_signatures = (
            b"MZ",                  # Windows PE executable
            b"\x7fELF",             # Linux ELF executable
            b"PK\x03\x04",          # zip/xlsx/docx disguised as .csv
            b"\xca\xfe\xba\xbe",    # Mach-O / Java class
        )
        if any(head.startswith(sig) for sig in binary_signatures):
            raise ValueError(
                f"'{os.path.basename(file_path)}' has a .csv extension but its "
                "content looks like a binary file, not text — refusing to load it."
            )


def _parse_worker(file_path: str, conn) -> None:
    """Runs in a separate process — the actual pandas parse call, isolated
    so a crash (e.g. a native-code bug triggered by a malformed/malicious
    file) or an unexpectedly long parse only affects this throwaway worker,
    never the main Flask engine. Uses Pipe (not Queue) for the same reason
    documented in sandbox_executor.py: Queue.put() hands off to a
    background thread that can lose data if the process exits right after,
    Pipe.send() is synchronous.
    """
    try:
        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file_path.endswith((".xlsx", ".xls")):
            df = pd.read_excel(file_path)
        else:
            raise ValueError("Unsupported file type")
        conn.send(("ok", df))
    except Exception as e:
        conn.send(("error", str(e)))
    finally:
        conn.close()


def _parse_file_isolated(file_path: str, timeout_seconds: int = 60) -> pd.DataFrame:
    """Runs the actual pandas parse in an isolated subprocess with a hard
    timeout — this is the "sandboxed parsing" control: a malformed/hostile
    file can crash or hang the parser without taking down the main engine.
    Note this is process isolation + a timeout, not a chroot/container —
    a real filesystem/network jail isn't practical for a cross-platform
    Electron+Python desktop app, but process isolation covers the two
    realistic failure modes (crash, hang) that actually matter here.
    """
    import multiprocessing as mp

    parent_conn, child_conn = mp.Pipe()
    proc = mp.Process(target=_parse_worker, args=(file_path, child_conn))
    proc.start()
    child_conn.close()

    try:
        deadline = time.monotonic() + timeout_seconds
        while True:
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                break
            if parent_conn.poll(min(remaining, 0.5)):
                try:
                    status, payload = parent_conn.recv()
                except EOFError:
                    # Worker exited (crashed) without sending anything —
                    # poll() can return True for the EOF condition itself,
                    # so recv() finding nothing there isn't a hang, it's a
                    # crash. Treat it the same as the not-is_alive() case.
                    proc.join(timeout=2)
                    raise ValueError(
                        f"File parsing crashed unexpectedly (exit code {proc.exitcode}) — "
                        "the file may be corrupted or malformed."
                    )
                proc.join(timeout=5)
                if proc.is_alive():
                    proc.terminate()
                    proc.join(timeout=2)
                    if proc.is_alive():
                        proc.kill()
                if status == "ok":
                    return payload
                raise ValueError(payload)
            if not proc.is_alive():
                raise ValueError(
                    f"File parsing crashed unexpectedly (exit code {proc.exitcode}) — "
                    "the file may be corrupted or malformed."
                )

        proc.terminate()
        proc.join(timeout=2)
        if proc.is_alive():
            proc.kill()
        raise ValueError(
            f"File parsing exceeded {timeout_seconds}s and was stopped — the file "
            "may be too complex or malformed."
        )
    finally:
        parent_conn.close()


def load_dataframe(file_path: str) -> pd.DataFrame:
    _validate_file_path_safety(file_path)

    # Check size BEFORE handing off to pandas — rejecting here avoids ever
    # loading an oversized file into memory just to then throw it away.
    try:
        size_mb = os.path.getsize(file_path) / (1024 * 1024)
    except OSError as e:
        raise ValueError(f"Could not read file: {e}")
    if size_mb > MAX_UPLOAD_FILE_MB:
        raise ValueError(
            f"File is {size_mb:.1f}MB, which exceeds Wektor's {MAX_UPLOAD_FILE_MB}MB "
            "limit. Try a smaller file, or pre-filter/sample it before uploading."
        )

    _validate_file_signature(file_path)

    if not file_path.endswith((".csv", ".xlsx", ".xls")):
        raise ValueError("Unsupported file type")
    df = _parse_file_isolated(file_path)

    if df.shape[1] > MAX_COLUMNS:
        raise ValueError(
            f"File has {df.shape[1]:,} columns, which exceeds Wektor's {MAX_COLUMNS:,} "
            "column limit — this usually means the file was parsed incorrectly "
            "(wrong delimiter, no real header row) rather than being a genuinely "
            "wide dataset."
        )
    if df.shape[0] == 0 or df.shape[1] == 0:
        raise ValueError(
            "This file loaded with no usable rows or columns — check that it isn't "
            "empty and has a proper header row."
        )

    return df


def sanitize_for_csv_export(df: pd.DataFrame) -> pd.DataFrame:
    """Neutralizes CSV formula injection before writing a CSV that a user
    might later open in Excel/Sheets. If a cell in a text column starts
    with '=', '+', '-', or '@', spreadsheet apps can interpret it as a
    formula (a classic "CSV injection" vector — e.g. a DB column value or
    merged-file cell containing something like '=cmd|...'). Prefixing such
    values with a leading apostrophe forces them to be treated as literal
    text. Only applied to the Database Connector and Multi-File Merge
    exports, since those are the two paths that write a CSV a user could
    plausibly open outside Wektor.
    """
    df = df.copy()
    dangerous_prefixes = ("=", "+", "-", "@")
    for col in df.select_dtypes(include=["object", "string"]).columns:
        df[col] = df[col].apply(
            lambda v: ("'" + v) if isinstance(v, str) and v.startswith(dangerous_prefixes) else v
        )
    return df

@app.route("/api/settings/api-key", methods=["POST"])
@require_local_auth
def set_api_key():
    """Validate and save a BYOK API key for a given provider."""
    data = request.json or {}
    provider = data.get("provider", "openrouter").lower().strip()
    api_key = data.get("apiKey", "").strip()

    if not api_key:
        return jsonify({"error": "API key is required"}), 400

    is_valid, message = validate_api_key(provider, api_key)
    if not is_valid:
        return jsonify({"error": message}), 400

    save_api_key(provider, api_key)
    return jsonify({
        "status": "success",
        "message": message,
        "maskedKey": mask_key(api_key)
    })


@app.route("/api/settings/api-key/status", methods=["GET"])
@require_local_auth
def get_api_key_status():
    """Check whether a key is set for a provider, WITHOUT exposing it."""
    provider = request.args.get("provider", "openrouter").lower().strip()
    key = get_api_key(provider)
    return jsonify({
        "hasKey": bool(key),
        "maskedKey": mask_key(key) if key else None
    })


@app.route("/api/settings/api-key", methods=["DELETE"])
@require_local_auth
def remove_api_key():
    provider = request.args.get("provider", "openrouter").lower().strip()
    delete_api_key(provider)
    return jsonify({"status": "success"})


@app.route("/api/license/activate", methods=["POST"])
@require_local_auth
def activate_license_route():
    data = request.json or {}
    result = license_manager.activate_license(data.get("licenseKey", ""))
    status_code = 200 if result.get("success") else 400
    return jsonify(result), status_code


@app.route("/api/license/status", methods=["GET"])
@require_local_auth
def license_status_route():
    """Fast, no-network read for UI display (Settings badge, feature-locked
    prompts). For actually gating a route, see require_pro / the inline
    check in connect_db() -- those call check_entitlement() directly,
    which independently re-verifies with Lemon Squeezy rather than trusting
    this cached value."""
    return jsonify(license_manager.get_cached_status())


@app.route("/api/license/deactivate", methods=["POST"])
@require_local_auth
def deactivate_license_route():
    return jsonify(license_manager.deactivate_license())


@app.route("/api/analyze", methods=["POST"])
@require_local_auth
def analyze_file():
    try:
        data = request.json or {}
        file_path = data.get("filePath")
        provider = (data.get("provider") or "openrouter").lower().strip()
        model_tier = (data.get("modelTier") or "fast").lower().strip()
        try:
            require_provider_key(provider)
        except NoApiKeyError as e:
            return jsonify({"error": str(e), "errorCode": "NO_API_KEY", "provider": provider}), 400
        if not file_path or not os.path.exists(file_path):
            return jsonify({"error": "File path not found"}), 400

        df = load_dataframe(file_path)
        schema_description = build_schema_description(df)

        # --- Phase 1: chart data + computed_stats (code-gen, sandboxed) ---
        chart_prompt = build_chart_code_prompt(schema_description, len(df))
        max_retries = 3
        current_prompt = chart_prompt
        chart_result = None

        for attempt in range(max_retries + 1):
            try:
                ai_code = call_ai_model(current_prompt, provider=provider, model_tier=model_tier)
                sanitized_code = sanitize_ai_code(ai_code)
                if not sanitized_code and ai_code:
                    raise SyntaxError("Sanitized code is empty, compilation check failed.")

                # Fail fast with an actionable message rather than letting an
                # import statement reach the sandbox and fail opaquely there.
                reject_import_statements(sanitized_code)

                # Verify by compiling (fast syntax check, no execution yet)
                compile(sanitized_code, '<ai_generated>', 'exec')

                # Single sandboxed execution happens inside execute_chart_code —
                # no separate unsafe validation exec needed here anymore.
                chart_result = execute_chart_code(df, sanitized_code)
                if chart_result is None:
                    raise RuntimeError("Sandboxed execution failed")
                print(f"Engine chart code successfully generated and executed on attempt {attempt + 1}")
                break
            except Exception as e:
                print(f"[RETRY CHART] Attempt {attempt + 1} failed: {e}")
                if attempt == max_retries:
                    print("[RETRY CHART] Max retries reached, falling back to default chart data.")
                    chart_result = execute_chart_code(df, "")
                    break

                current_prompt = (
                    f"{chart_prompt}\n\n"
                    f"CRITICAL: The previous Python code you generated failed with the following error:\n"
                    f"Error: {sanitize_error_for_ai(e)}\n\n"
                    f"The failed code was:\n"
                    f"```python\n{ai_code if 'ai_code' in locals() else 'No code generated'}\n```\n\n"
                    f"Please correct the error, ensuring correct Python syntax, block indentation (4 spaces), and proper try/except structures. "
                    f"Output ONLY corrected executable Python code. No prose, no markdown fences."
                )

        # --- Phase 2: narrative text (plain JSON, no sandbox, no exec()) ---
        # Kept deliberately small — a handful of short sentences, not a
        # script — so truncation here is unlikely even at a modest token
        # cap. Only 2 retries: if the model can't produce valid JSON
        # twice in a row, generate_fallback_metrics() text (inside
        # assemble_metrics) is a perfectly reasonable result, not a
        # degraded one, since it's still derived from the real data.
        narrative_prompt = build_narrative_prompt(
            chart_result.get("computed_stats") or {},
            chart_result.get("chart_data") or {},
            schema_description,
            len(df),
        )
        narrative_system_prompt = (
            "You are a data analyst. Output ONLY a valid JSON object. "
            "Never wrap it in markdown fences. Never add any text before or after the JSON."
        )
        narrative_max_retries = 2
        current_narrative_prompt = narrative_prompt
        narrative = None

        for attempt in range(narrative_max_retries + 1):
            try:
                raw_narrative = call_ai_model(
                    current_narrative_prompt,
                    provider=provider,
                    system_prompt=narrative_system_prompt,
                    model_tier=model_tier,
                    max_tokens_override=1536,
                )
                parsed = parse_narrative_json(raw_narrative)
                if not parsed:
                    raise ValueError("Narrative response was not valid JSON.")
                narrative = parsed
                print(f"Engine narrative successfully generated and parsed on attempt {attempt + 1}")
                break
            except Exception as e:
                print(f"[RETRY NARRATIVE] Attempt {attempt + 1} failed: {e}")
                if attempt == narrative_max_retries:
                    print("[RETRY NARRATIVE] Max retries reached, falling back to default narrative text.")
                    narrative = None
                    break

                current_narrative_prompt = (
                    f"{narrative_prompt}\n\n"
                    f"CRITICAL: Your previous response failed to parse as JSON with this error:\n"
                    f"Error: {e}\n\n"
                    f"Output ONLY the corrected JSON object. No markdown fences, no text before or after it."
                )

        metrics = assemble_metrics(chart_result, narrative, df)

        # Make sure everything is JSON serializable
        safe_metrics = make_json_serializable(metrics)
        # Data-quality stats (duplicates, missing values) — computed
        # separately from the AI/sandbox path since they're a plain
        # deterministic pandas pass, not something the AI needs to derive.
        # Nested inside "metrics" (not top-level) so it flows through
        # populateMetrics()/appState.lastRawMetrics on the frontend the
        # same way chart_data and deep_dive_data already do.
        safe_metrics["data_quality"] = make_json_serializable(compute_data_quality(df))
        return jsonify({
            "fileName": os.path.basename(file_path),
            "status": "success",
            "metrics": safe_metrics,
            # Names + coarse types only — never row data — so the frontend's
            # Column Mapping card can offer the dataset's real columns.
            "columns": get_column_schema(df)
        })
    except Exception as e:
        print(f"Error in /api/analyze: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/remap-charts", methods=["POST"])
@require_local_auth
def remap_charts():
    """Re-aggregate the FULL dataset (server-side; never sent to the
    frontend) against user-chosen time/category/value columns from the
    Column Mapping card. This is a deterministic pandas groupby, not an AI
    call — same privacy guarantee as everything else (only aggregated
    results cross the boundary), and fast/reproducible since there's no
    model involved.
    """
    try:
        data = request.json or {}
        file_path = data.get("filePath")
        if not file_path or not os.path.exists(file_path):
            return jsonify({"error": "File path not found. Re-upload the original file to use Column Mapping."}), 400

        time_col = (data.get("timeCol") or "").strip() or None
        category_col = (data.get("categoryCol") or "").strip() or None
        value_col = (data.get("valueCol") or "").strip() or None

        if not any([time_col, category_col, value_col]):
            return jsonify({"error": "Select at least one column to remap."}), 400

        df = load_dataframe(file_path)

        for col_name, label in ((time_col, "Time"), (category_col, "Category"), (value_col, "Value")):
            if col_name and col_name not in df.columns:
                return jsonify({"error": f"{label} column '{col_name}' was not found in this dataset."}), 400

        chart_data = compute_remapped_chart_data(df, time_col, category_col, value_col)
        return jsonify({"status": "success", **make_json_serializable(chart_data)})
    except Exception as e:
        print(f"Error in /api/remap-charts: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/chat", methods=["POST"])
@require_local_auth
def chat_with_data():
    try:
        data = request.json or {}
        file_path = data.get("filePath")
        query = data.get("query")
        provider = (data.get("provider") or "openrouter").lower().strip()
        model_tier = (data.get("modelTier") or "fast").lower().strip()
        try:
            require_provider_key(provider)
        except NoApiKeyError as e:
            return jsonify({"error": str(e), "errorCode": "NO_API_KEY", "provider": provider}), 400

        if not file_path or not os.path.exists(file_path):
            return jsonify({"error": "File path not found"}), 400
        if not query:
            return jsonify({"error": "Query is required"}), 400
        MAX_CHAT_QUERY_LENGTH = 2000
        if len(query) > MAX_CHAT_QUERY_LENGTH:
            return jsonify({
                "error": f"Query is {len(query):,} characters, which exceeds the "
                         f"{MAX_CHAT_QUERY_LENGTH:,} character limit."
            }), 400

        df = load_dataframe(file_path)

        # Schema-only description — column names, types, and aggregate
        # stats (min/max/mean, unique counts, date ranges), never actual
        # row values. The generated code still runs against the REAL `df`
        # in the sandbox below, so answer accuracy is unaffected — the AI
        # just can't "eyeball" example values while writing the code.
        schema_description = build_schema_description(df)

        prompt = (
            f"You are Wektor, an advanced operational analytics assistant.\n"
            f"You have access to a pandas DataFrame containing a loaded dataset.\n"
            f"The DataFrame is loaded in memory as variable `df` and has {len(df):,} total rows.\n\n"
            f"Dataset Schema (column names, types, and aggregate stats only — no raw "
            f"row values are ever sent to this model; write code that inspects `df` "
            f"directly if you need to see actual values):\n"
            f"{schema_description}\n\n"
            f"User Query: {query}\n\n"
            f"Instructions:\n"
            f"1. To answer the query, you MUST write a Python script that processes `df`.\n"
            f"   - The script MUST define a string variable named `answer` which holds the final human-readable response.\n"
            f"   - You MUST wrap your entire script inside a ```python block. Do not provide code without this block.\n"
            f"   - Keep code simple, utilizing pandas/numpy.\n"
            f"   - Do NOT add import statements, not even for standard library modules. pd, np, df, re, math, statistics, collections, and datetime are already loaded — use them directly (e.g. `re.findall(...)`, `datetime.datetime.now()`). No other modules are available.\n"
            f"   - NEVER iterate row-by-row over df (no .iterrows(), .itertuples(), or `for i in range(len(df))` with df.iloc[i]) — df has {len(df):,} rows and row-wise Python loops will fail (hard-capped at 20,000 loop iterations). Use vectorized operations: column arithmetic, .value_counts(), .groupby(), boolean masks, .mean()/.sum()/.std(), etc.\n"
            f"   - Avoid print statements. Only set `answer`.\n"
            f"   - Write robust code. If a column is missing or empty, handle it gracefully.\n"
            f"2. ONLY if the user is asking a conversational question that requires NO data analysis, you can answer directly in plain text without a ```python block.\n"
            f"3. Keep responses clear, concise, and focused on business insights."
        )

        import re
        max_retries = 3
        current_prompt = prompt
        ans = None
        
        for attempt in range(max_retries + 1):
            try:
                raw_response = call_ai_model(current_prompt, provider=provider, model_tier=model_tier)
                code_match = re.search(r"```(?:python)?\s*(.*?)\s*```", raw_response, re.DOTALL | re.IGNORECASE)
                
                if code_match or "answer =" in raw_response:
                    if code_match:
                        code_to_run = code_match.group(1).strip()
                    else:
                        code_to_run = raw_response.strip()
                    
                    code_to_run = sanitize_ai_code(code_to_run)
                    if not code_to_run and raw_response:
                        raise SyntaxError("Sanitized code is empty, compilation check failed.")

                    # Fail fast with an actionable message rather than letting an
                    # import statement reach the sandbox and fail opaquely there.
                    reject_import_statements(code_to_run)

                    # Sandboxed execution
                    ok, local_vars, sandbox_error = run_sandboxed(code_to_run, df, timeout_seconds=25)
                    if not ok:
                        raise RuntimeError(sandbox_error)

                    if "answer" not in local_vars:
                        raise ValueError("The variable 'answer' was not defined in the code.")

                    ans = local_vars.get("answer")
                    print(f"Chat code successfully generated and executed on attempt {attempt + 1}")
                    break
                else:
                    # Direct text answer
                    ans = raw_response.strip()
                    break
            except Exception as e:
                print(f"[RETRY CHAT] Attempt {attempt + 1} failed: {e}")
                if attempt == max_retries:
                    ans = f"Sorry, I tried to query the dataset but encountered a calculation error: {e}"
                    break
                
                current_prompt = (
                    f"{prompt}\n\n"
                    f"CRITICAL: The previous Python code you generated failed with the following error:\n"
                    f"Error: {sanitize_error_for_ai(e)}\n\n"
                    f"The failed code was:\n"
                    f"```python\n{code_to_run if 'code_to_run' in locals() else raw_response}\n```\n\n"
                    f"Please correct the error, ensure proper try/except blocks are syntactically valid and indented (4 spaces), and make sure the variable `answer` is assigned a string response. Output ONLY code in a ```python block."
                )

        return jsonify({
            "status": "success",
            "answer": ans
        })
    except Exception as e:
        print(f"Error in /api/chat: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/roast", methods=["POST"])
@require_local_auth
def roast_data():
    """Data Roast — savage, funny commentary on ALREADY-COMPUTED analysis
    metrics the frontend sends up (from appState, populated by a prior
    /api/analyze call). Pure text generation: no file read, no dataframe,
    no sandbox execution. Same privacy guarantee as everything else — only
    aggregated numbers ever leave the machine, and here they don't even
    leave twice, they're just echoed back to the AI provider for a joke.
    """
    try:
        data = request.json or {}
        metrics = data.get("metrics") or {}
        file_name = (data.get("fileName") or "your dataset").strip() or "your dataset"
        personality = (data.get("personality") or "brutalBoss").strip()
        provider = (data.get("provider") or "openrouter").lower().strip()
        model_tier = (data.get("modelTier") or "fast").lower().strip()
        if personality not in ROAST_PERSONALITY_VOICES:
            personality = "brutalBoss"

        try:
            require_provider_key(provider)
        except NoApiKeyError as e:
            return jsonify({"error": str(e), "errorCode": "NO_API_KEY", "provider": provider}), 400

        if not metrics:
            return jsonify({"error": "No analysis metrics available to roast. Run an analysis first."}), 400

        prompt = build_roast_prompt(metrics, file_name, personality)

        max_retries = 2
        current_prompt = prompt
        roast_text = None
        roast_score = None

        for attempt in range(max_retries + 1):
            try:
                raw_response = call_ai_model(current_prompt, provider=provider, system_prompt=ROAST_SYSTEM_PROMPT, model_tier=model_tier)
                parsed = parse_roast_response(raw_response)
                roast_text = parsed["roast"]
                roast_score = parsed["score"]
                print(f"Roast generated successfully on attempt {attempt + 1}")
                break
            except Exception as e:
                print(f"[RETRY ROAST] Attempt {attempt + 1} failed: {e}")
                if attempt == max_retries:
                    print("[RETRY ROAST] Max retries reached, using fallback roast.")
                    roast_text = (
                        "Your data is so unremarkable even I can't find a punchline — "
                        "and that's honestly the most damning review I can give it."
                    )
                    roast_score = 5
                    break
                current_prompt = (
                    f"{prompt}\n\n"
                    f"CRITICAL: Your previous response could not be parsed as valid JSON. "
                    f"Error: {e}\n"
                    "Output ONLY the raw JSON object described above — no markdown fences, "
                    "no prose, no explanation, nothing else."
                )

        return jsonify({
            "status": "success",
            "roast": roast_text,
            "score": roast_score
        })
    except Exception as e:
        print(f"Error in /api/roast: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/connect-db", methods=["POST"])
@require_local_auth
def connect_db():
    """Runs the user's own SQL query against their own database (SQLite,
    PostgreSQL, or MySQL) and exports the result to a temporary CSV so it
    can flow through the exact same analyze pipeline as a normal file upload.
    """
    try:
        data = request.json or {}
        db_type = (data.get("dbType") or "").strip()
        database = (data.get("database") or "").strip()
        host = (data.get("host") or "").strip()
        port = (data.get("port") or "").strip()
        user = (data.get("user") or "").strip()
        password = data.get("password") or ""
        query = (data.get("query") or "").strip()

        if not database or not query:
            return jsonify({"error": "Database name/path and SQL query are required."}), 400

        # SQLite is free; MySQL/PostgreSQL are the actual Pro-gated feature
        # here (per pricing.tsx). This is a conditional check rather than a
        # route-level @require_pro decorator specifically because the same
        # route serves both the free and Pro cases depending on dbType.
        if db_type.lower() in ("postgres", "postgresql", "mysql"):
            entitlement = license_manager.check_entitlement()
            if not entitlement.get("entitled"):
                return jsonify({
                    "error": "MySQL and PostgreSQL connections require a Wektor Pro license. SQLite is free.",
                    "errorCode": "PRO_REQUIRED",
                    "reason": entitlement.get("reason"),
                }), 402

        df, truncated = daily_watch.run_watch_query(db_type, host, port, database, user, password, query)

        tmp_dir = os.path.join(tempfile.gettempdir(), "wektor_db_exports")
        os.makedirs(tmp_dir, exist_ok=True)
        safe_label = database.replace(os.sep, "_").replace("/", "_").replace("\\", "_")[:40]
        file_name = f"{safe_label}_query_export.csv"
        file_path = os.path.join(tmp_dir, file_name)
        sanitize_for_csv_export(df).to_csv(file_path, index=False)

        return jsonify({
            "status": "success",
            "fileName": file_name,
            "filePath": file_path,
            "rowCount": int(len(df)),
            "truncated": truncated,
        })
    except Exception as e:
        print(f"Error in /api/connect-db: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


def _normalize_col_name(name: str) -> str:
    """Loosen a column name for fuzzy matching across files:
    case-insensitive, ignore spaces/underscores/hyphens. Used only to
    SUGGEST/locate a corresponding column in each file — the actual merge
    always uses each file's own real column name, never a renamed guess.
    """
    return str(name).strip().lower().replace(" ", "").replace("_", "").replace("-", "")


def _find_matching_column(target: str, columns: list) -> str | None:
    """Find the column in `columns` that best matches `target`, allowing
    for case/spacing/underscore differences (e.g. user says 'date', file
    has 'Date' or 'order_date' would NOT match — only naming-style
    differences match, not different concepts)."""
    normalized_target = _normalize_col_name(target)
    for col in columns:
        if _normalize_col_name(col) == normalized_target:
            return col
    return None


def _coerce_key_column(series: pd.Series) -> pd.Series:
    """Normalize a merge-key column so the same logical value lines up
    across files even if one file stored it as a date and another as text,
    or with extra whitespace. Tries datetime first (common for date keys),
    falls back to a trimmed string.
    """
    try:
        parsed = pd.to_datetime(series, errors="coerce")
        if parsed.notna().sum() / max(len(series), 1) > 0.7:
            return parsed.dt.strftime("%Y-%m-%d")
    except Exception:
        pass
    return series.astype(str).str.strip()


@app.route("/api/merge-datasets", methods=["POST"])
@require_local_auth
def merge_datasets():
    """Combine multiple uploaded files into one dataset before analysis.

    Two modes:
      - No mergeCol provided  -> CONCAT: stack files on top of each other
        (the common case — e.g. Jan.csv + Feb.csv + Mar.csv of the same
        report). Safe by default; mismatched columns just become blank
        for the rows that don't have them, and we warn if overlap is low.
      - mergeCol provided      -> KEY MERGE: join files on a shared column
        (e.g. customers.csv + transactions.csv on 'customer_id'). Each
        file's real matching column name is located via fuzzy name
        matching (case/spacing differences only, never a different
        concept), the key is normalized (date-aware) so types line up,
        and files are merged pairwise with an outer join so no rows are
        silently dropped.
    """
    try:
        data = request.json or {}
        file_paths = data.get("filePaths") or []
        merge_col = (data.get("mergeCol") or "").strip() or None

        if not isinstance(file_paths, list) or len(file_paths) < 2:
            return jsonify({"error": "At least 2 file paths are required to merge."}), 400

        dataframes = []
        for path in file_paths:
            if not os.path.exists(path):
                return jsonify({"error": f"File not found: {path}"}), 400
            dataframes.append(load_dataframe(path))

        warnings_list = []

        if merge_col:
            # --- KEY MERGE MODE ---
            resolved_cols = []
            for i, df in enumerate(dataframes):
                match = _find_matching_column(merge_col, df.columns.tolist())
                if not match:
                    return jsonify({
                        "error": f"Column matching '{merge_col}' was not found in file {i + 1} "
                                 f"({os.path.basename(file_paths[i])}). Available columns: "
                                 f"{', '.join(df.columns[:10])}"
                    }), 400
                resolved_cols.append(match)
                if match.lower() != merge_col.lower():
                    warnings_list.append(
                        f"File {i + 1}: matched '{merge_col}' to column '{match}'."
                    )

            merged = dataframes[0].copy()
            merged["_merge_key_"] = _coerce_key_column(merged[resolved_cols[0]])

            for df, col in zip(dataframes[1:], resolved_cols[1:]):
                temp = df.copy()
                temp["_merge_key_"] = _coerce_key_column(temp[col])
                merged = merged.merge(temp, on="_merge_key_", how="outer", suffixes=("", "_dup"))

            merged = merged.drop(columns=["_merge_key_"])
            result_df = merged
        else:
            # --- CONCAT MODE ---
            all_columns = [set(df.columns) for df in dataframes]
            common_columns = set.intersection(*all_columns) if all_columns else set()
            union_columns = set.union(*all_columns) if all_columns else set()
            overlap_pct = (len(common_columns) / len(union_columns) * 100) if union_columns else 100

            if overlap_pct < 50:
                warnings_list.append(
                    f"These files only share {overlap_pct:.0f}% of their columns — "
                    f"the combined dataset will have a lot of blank values."
                )

            result_df = pd.concat(dataframes, ignore_index=True, sort=False)

        tmp_dir = os.path.join(tempfile.gettempdir(), "wektor_merged")
        os.makedirs(tmp_dir, exist_ok=True)
        file_name = f"merged_{len(file_paths)}_files.csv"
        file_path = os.path.join(tmp_dir, file_name)
        sanitize_for_csv_export(result_df).to_csv(file_path, index=False)

        return jsonify({
            "status": "success",
            "fileName": file_name,
            "filePath": file_path,
            "rowCount": int(len(result_df)),
            "columnCount": int(len(result_df.columns)),
            "mode": "merge" if merge_col else "concat",
            "warnings": warnings_list,
        })
    except Exception as e:
        print(f"Error in /api/merge-datasets: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/daily-watch/config", methods=["GET"])
@require_local_auth
def daily_watch_get_config():
    """Returns the saved Daily Watch config (password never included)."""
    config = daily_watch.get_config()
    return jsonify({"config": config})


@app.route("/api/daily-watch/config", methods=["POST"])
@require_local_auth
@require_pro
def daily_watch_save_config():
    """Saves a Daily Watch config: non-secret fields go to a plain JSON
    file; the password goes through key_store's existing secure storage
    (keyring, falling back to encrypted-file) under provider 'db_watch'.
    """
    data = request.json or {}
    required = ["dbType", "database", "query"]
    if not all((data.get(k) or "").strip() for k in required):
        return jsonify({"error": "Database type, database name/path, and query are required."}), 400

    password = data.get("password")
    if password:
        daily_watch.save_password(password)

    config = {
        "label": data.get("label") or "My Daily Watch",
        "dbType": data.get("dbType"),
        "host": data.get("host", ""),
        "port": data.get("port", ""),
        "database": data.get("database"),
        "user": data.get("user", ""),
        "query": data.get("query"),
        "checkHour": int(data.get("checkHour", 9)),
        "enabled": bool(data.get("enabled", True)),
        "backgroundEnabled": bool(data.get("backgroundEnabled", False)),
    }
    daily_watch.save_config(config)
    return jsonify({"status": "success", "config": config})


@app.route("/api/daily-watch/config", methods=["DELETE"])
@require_local_auth
def daily_watch_delete_config():
    daily_watch.delete_config()
    return jsonify({"status": "success"})


@app.route("/api/daily-watch/status", methods=["GET"])
@require_local_auth
def daily_watch_status():
    """Lightweight status check — does NOT re-run the query. Used by the
    renderer/tray to show 'last checked' info without triggering a fresh
    (potentially slow) database round-trip.
    """
    config = daily_watch.get_config()
    latest = daily_watch.get_latest_snapshot()
    return jsonify({
        "config": config,
        "lastCheckedAt": latest.get("checked_at") if latest else None,
    })


@app.route("/api/daily-watch/check", methods=["POST"])
@require_local_auth
@require_pro
def daily_watch_check():
    """Runs the saved watch query now, diffs it against the last stored
    snapshot, saves a new snapshot, and returns the 2-3 point summary that
    powers the floating 'what changed since yesterday' card. This is the
    endpoint main.js's background scheduler calls on a timer.
    """
    try:
        config = daily_watch.get_config()
        if not config or not config.get("enabled"):
            return jsonify({"error": "Daily Watch is not configured or is disabled."}), 400

        password = daily_watch.get_password() or ""
        df, truncated = daily_watch.run_watch_query(
            config["dbType"], config.get("host", ""), config.get("port", ""),
            config["database"], config.get("user", ""), password, config["query"]
        )

        new_snapshot = daily_watch.compute_snapshot(df)
        old_snapshot = daily_watch.get_latest_snapshot()
        diff = daily_watch.diff_snapshots(old_snapshot, new_snapshot)
        daily_watch.append_snapshot(new_snapshot)

        return jsonify({
            "status": "success",
            "changed": diff["changed"],
            "summaryPoints": diff["summary_points"],
            "checkedAt": new_snapshot["checked_at"],
            "label": config.get("label", "My Daily Watch"),
            "truncated": truncated,
        })
    except Exception as e:
        print(f"Error in /api/daily-watch/check: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # MUST be the very first call in the entry-point script when frozen.
    # sandbox_executor.py uses multiprocessing.Process to isolate AI-generated
    # code. On Windows (and anywhere else using the "spawn" start method),
    # a frozen PyInstaller executable re-launches itself to create a new
    # process — without freeze_support() that re-launch re-runs this entire
    # script from scratch instead of just the sandbox worker, causing either
    # an infinite relaunch loop or a second Flask server trying to bind
    # port 5005. This is a no-op when not frozen, so it's safe to always call.
    import multiprocessing
    multiprocessing.freeze_support()

    cleanup_stale_temp_exports()
    print(f"LOCAL_AUTH_TOKEN={LOCAL_AUTH_TOKEN}")
    app.run(port=5005, debug=False)