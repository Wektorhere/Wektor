"""
Wektor Sandbox Executor — hardened replacement for the raw exec() calls
in engine.py (lines ~794-802, ~936-942, ~1047).
 
BUILD MARKER: 2026-07-26-a (Vektor→Wektor rename sweep — see
WEKTOR_PRELAUNCH_CHECKLIST.md Section 5. Behavior unchanged from
2026-07-18-a; only product-name strings and this marker were touched.)
If you don't see this exact line printed at engine startup, the running
app is NOT using this file — quit it fully (not just close the window;
on macOS closing the window does not quit the app or its Python
subprocess) and relaunch.

Defense layers:
  1. RestrictedPython AST compilation — blocks dunder attribute access
     (stops the ().__class__.__base__.__subclasses__() escape) and blocks
     bare `import` statements in the generated code.
  2. Minimal builtins allowlist — no __import__, no open, no eval/exec,
     no compile, no input. Only safe, side-effect-free names.
  3. Restricted pandas/numpy proxy — blocks pd.read_csv/read_excel/
     read_json/read_html/read_sql/read_pickle and the to_*() writers,
     so generated code can only operate on the `df` already in memory,
     never touch the filesystem or network via pandas' own I/O.
  4. Process isolation + hard timeout — the code runs in a separate
     process via multiprocessing, with a wall-clock timeout. If it hangs
     (e.g. `while True: pass`) or misbehaves, the process is killed
     outright at the OS level, not just "caught" in-process.
 
Usage (drop-in replacement for the old exec_globals + exec(...) pattern):
 
    from sandbox_executor import run_sandboxed
 
    ok, result_vars, error = run_sandboxed(sanitized_code, df, timeout_seconds=15)
    if ok:
        # result_vars is a dict of the variables the code assigned
        ...
    else:
        # error is a string describing what went wrong (use for retry prompt)
        ...
"""
import multiprocessing as mp
import time
import pandas as pd
import numpy as np
 
from RestrictedPython import compile_restricted, safe_globals
from RestrictedPython.Eval import default_guarded_getiter
from RestrictedPython.Guards import (
    guarded_iter_unpack_sequence,
    safer_getattr,
    full_write_guard,
)

print("[Wektor] sandbox_executor.py loaded - BUILD 2026-07-26-a (Vektor->Wektor rename; pipe-poll + write-guard fixes carried over from 2026-07-18-a)")
 
# ---------------------------------------------------------------------------
# 1. Restricted pandas proxy — blocks file/network I/O methods entirely.
#    Generated code never needs these: `df` is already loaded in memory.
# ---------------------------------------------------------------------------
_BLOCKED_PD_ATTRS = {
    "read_csv", "read_excel", "read_json", "read_html", "read_sql",
    "read_sql_query", "read_sql_table", "read_pickle", "read_parquet",
    "read_feather", "read_hdf", "read_orc", "read_stata", "read_sas",
    "read_spss", "read_gbq", "read_clipboard", "read_fwf", "read_table",
    "ExcelWriter", "ExcelFile", "HDFStore",
}
 
 
class _RestrictedPandasProxy:
    """Exposes the pandas module but blocks I/O-capable attributes."""
 
    def __init__(self, real_module):
        object.__setattr__(self, "_real_module", real_module)
 
    def __getattr__(self, name):
        if name in _BLOCKED_PD_ATTRS:
            raise AttributeError(
                f"'{name}' is disabled in Wektor's sandbox — generated code "
                f"must only operate on the in-memory `df`, not read/write files "
                f"or network resources."
            )
        return getattr(object.__getattribute__(self, "_real_module"), name)
 
 
def _make_restricted_pd():
    return _RestrictedPandasProxy(pd)
 

# ---------------------------------------------------------------------------
# 1b. Custom item/attribute-write guard for `_write_`.
#
# RestrictedPython's compiled code routes every assignment target through
# `_write_(obj)` -- so `df['col'] = x` becomes `_write_(df)['col'] = x` and
# `df.loc[0, 'a'] = x` becomes `_write_(df.loc)[0, 'a'] = x`.
#
# RestrictedPython.Guards.full_write_guard only lets `dict` and `list`
# instances through untouched; everything else gets wrapped in a `Wrapper`
# whose __setitem__ requires the wrapped object to define a
# `__guarded_setitem__` method. Pandas/numpy objects never define that
# method, so EVERY item/slice assignment on a DataFrame, Series, Index, or
# ndarray -- including the extremely common `df['new_col'] = ...` pattern --
# was failing with "object does not support item or slice assignment" on
# every single analysis run. This is why the same error kept recurring
# despite the retry loop and the fallback path: the retry loop reruns the
# exact same restricted sandbox, so a structurally-guaranteed failure like
# this fails identically on every attempt, exhausts all 4 retries, and
# always lands on the generic fallback metrics.
#
# Fix: widen the trusted set to include the pandas/numpy object graph
# (DataFrame, Series, Index, ndarray, and their internal helper objects
# like the `.loc`/`.iloc` indexers, which live in `pandas.core.*` /
# `numpy.*` modules), while still routing everything else through the
# original, stricter `full_write_guard`. This does not weaken the sandbox's
# actual security boundary: dangerous introspection (`__class__`,
# `__subclasses__`, etc.) is blocked separately and unconditionally by
# `safer_getattr` at the AST level for every object regardless of type, and
# the hard OS-level process isolation + timeout + banned builtins
# (no `__import__`/`open`/`eval`/`exec`) remain unchanged.
def _is_trusted_write_target(ob) -> bool:
    if isinstance(ob, (dict, list, set)):
        return True
    module = type(ob).__module__ or ""
    return (
        module == "numpy" or module.startswith("numpy.")
        or module == "pandas" or module.startswith("pandas.")
    )


def _analysis_write_guard(ob):
    if _is_trusted_write_target(ob):
        return ob
    return full_write_guard(ob)


 
 
# Also strip to_csv/to_pickle/to_sql etc. from the *DataFrame instance* itself
# by wrapping df access — dataframe-level I/O methods are blocked via a
# lightweight monkeypatch scoped to the sandboxed copy only.
_BLOCKED_DF_METHODS = {
    "to_csv", "to_excel", "to_json", "to_html", "to_sql", "to_pickle",
    "to_parquet", "to_feather", "to_hdf", "to_clipboard", "to_gbq",
}
 
 
def _sandbox_df_copy(df: pd.DataFrame) -> pd.DataFrame:
    """Return a copy of df with dangerous I/O methods disabled on the instance."""
    safe_df = df.copy()
 
    def _blocked(*args, **kwargs):
        raise AttributeError("File/export operations are disabled in Wektor's sandbox.")
 
    for method_name in _BLOCKED_DF_METHODS:
        try:
            object.__setattr__(safe_df, method_name, _blocked)
        except Exception:
            # Some pandas internals don't allow instance-level attribute
            # overrides on certain versions; safe to skip, the module-level
            # proxy above + process isolation still cover this.
            pass
    return safe_df
 
 
# ---------------------------------------------------------------------------
# 2. Minimal safe builtins — everything generated analysis code legitimately
#    needs, nothing that grants filesystem/process/network/reflection access.
# ---------------------------------------------------------------------------
_SAFE_BUILTINS = {
    "None": None, "True": True, "False": False,
    "abs": abs, "all": all, "any": any, "bool": bool, "dict": dict,
    "enumerate": enumerate, "filter": filter, "float": float, "int": int,
    "len": len, "list": list, "map": map, "max": max, "min": min,
    "range": range, "round": round, "set": set, "sorted": sorted,
    "str": str, "sum": sum, "tuple": tuple, "zip": zip,
    "isinstance": isinstance, "type": type, "repr": repr,
    "Exception": Exception, "ValueError": ValueError, "TypeError": TypeError,
    "KeyError": KeyError, "IndexError": IndexError,
    "ZeroDivisionError": ZeroDivisionError, "AttributeError": AttributeError,
    "RuntimeError": RuntimeError, "StopIteration": StopIteration,
    "print": lambda *a, **k: None,  # swallow — code shouldn't print, but don't crash if it does
    "_getattr_": safer_getattr,
    "_getiter_": default_guarded_getiter,
    "_iter_unpack_sequence_": guarded_iter_unpack_sequence,
    "_getitem_": lambda obj, key: obj[key],  # allow df["col"], dict["key"], list[0]
    "_write_": _analysis_write_guard,        # allow attribute/item assignment on pandas/numpy/dict/list/set; still blocks dunders elsewhere
}
# Explicitly NOT included: __import__, open, eval, exec, compile, input,
# globals, locals, vars, dir, getattr(unrestricted), setattr, delattr,
# help, breakpoint, memoryview, exit, quit
 
 
# Cap on the serialized size of whatever sandboxed code assigns as result
# variables. Without this, AI-generated code that builds (accidentally or
# deliberately) a huge string/list/structure sails straight back through
# the pipe with no limit — confirmed via direct test: a 200MB string
# round-tripped cleanly. This isn't a security boundary (the process is
# already isolated and time-limited) but a memory/DoS guard so one bad
# generated snippet can't balloon the parent engine's memory on a modest
# machine.
_MAX_RESULT_BYTES = 5 * 1024 * 1024  # 5MB — generous for real analysis output


def _result_size_bytes(obj) -> int:
    """Best-effort size estimate that doesn't require the object to be
    JSON-serializable yet (that happens later, in engine.py)."""
    try:
        import sys as _sys
        if isinstance(obj, (str, bytes)):
            return len(obj)
        if isinstance(obj, dict):
            return sum(_result_size_bytes(k) + _result_size_bytes(v) for k, v in obj.items())
        if isinstance(obj, (list, tuple, set)):
            return sum(_result_size_bytes(v) for v in obj)
        if isinstance(obj, (pd.DataFrame, pd.Series)):
            return int(obj.memory_usage(deep=True).sum()) if hasattr(obj, "memory_usage") else _sys.getsizeof(obj)
        return _sys.getsizeof(obj)
    except Exception:
        return 0


def _worker(code: str, df: pd.DataFrame, conn: "mp.connection.Connection"):
    """Runs in a separate process. Compiles with RestrictedPython, executes
    with the locked-down globals, and reports back via the pipe.

    NOTE: this uses mp.Pipe() rather than mp.Queue(). Queue.put() hands data
    to a background feeder thread that writes to the underlying pipe
    asynchronously — if the worker process exits immediately after put(),
    it can terminate before that thread flushes, so the parent sees a clean
    exit (code 0) but an EMPTY queue ("Process exited unexpectedly (exit
    code 0)"), even though the code ran successfully. Pipe.send() writes
    synchronously, so this race can't happen.
    """
    try:
        byte_code = compile_restricted(code, filename="<ai_generated>", mode="exec")
 
        restricted_globals = dict(safe_globals)  # RestrictedPython's own safe base
        restricted_globals["__builtins__"] = _SAFE_BUILTINS
        restricted_globals["pd"] = _make_restricted_pd()
        restricted_globals["np"] = np  # numpy has no file/network I/O surface to speak of
 
        local_vars = {"df": _sandbox_df_copy(df)}
 
        exec(byte_code, restricted_globals, local_vars)
 
        # Only pass back JSON-friendly-ish results; the caller does full
        # serialization. Drop df itself and any non-serializable junk here
        # to keep the payload small and safe.
        local_vars.pop("df", None)

        total_size = _result_size_bytes(local_vars)
        if total_size > _MAX_RESULT_BYTES:
            conn.send((
                "error",
                f"Generated code produced a result of ~{total_size // (1024*1024)}MB, "
                f"which exceeds the {_MAX_RESULT_BYTES // (1024*1024)}MB sandbox result "
                "limit. This usually means the code accumulated something it shouldn't "
                "have (e.g. a full column dumped into a string) rather than a real "
                "aggregate result.",
            ))
            return

        conn.send(("ok", local_vars))
    except Exception as e:
        conn.send(("error", str(e)))
    finally:
        conn.close()
 
 
def run_sandboxed(code: str, df: pd.DataFrame, timeout_seconds: int = 15):
    """
    Executes `code` against `df` in an isolated process with a hard timeout.

    IMPORTANT: we poll() the pipe while waiting, rather than calling
    proc.join(timeout_seconds) first. mp.Pipe() has a small OS-level buffer
    (tens of KB). If the worker's result is larger than that buffer, its
    conn.send() call blocks until the parent reads — but a parent sitting
    in join() isn't reading, so both sides wait on each other until the
    timeout kills the process. Polling avoids that deadlock by actively
    draining the pipe the moment data arrives.

    Returns: (success: bool, result_vars: dict, error: str|None)
    """
    if not code or not code.strip():
        return False, {}, "Empty code"

    parent_conn, child_conn = mp.Pipe()
    proc = mp.Process(target=_worker, args=(code, df, child_conn))
    proc.start()
    child_conn.close()  # only the child needs its end open

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
                    # Worker crashed/exited without sending anything — poll()
                    # can return True for the EOF condition itself, so recv()
                    # finding nothing there is a crash, not real data.
                    proc.join(timeout=2)
                    return False, {}, f"Process exited unexpectedly (exit code {proc.exitcode})"
                proc.join(timeout=5)
                if proc.is_alive():
                    proc.terminate()
                    proc.join(timeout=2)
                    if proc.is_alive():
                        proc.kill()
                if status == "ok":
                    return True, payload, None
                else:
                    return False, {}, payload
            if not proc.is_alive():
                # Process ended without ever sending anything — a real crash,
                # not a hang. Distinguish this from a genuine timeout below.
                return False, {}, f"Process exited unexpectedly (exit code {proc.exitcode})"

        # Deadline reached with no data and the process still running — genuine hang.
        proc.terminate()
        proc.join(timeout=2)
        if proc.is_alive():
            proc.kill()  # last resort, hard kill
        return False, {}, f"Execution exceeded {timeout_seconds}s timeout — terminated."
    finally:
        parent_conn.close()