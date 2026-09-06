"""Re-runs the same 6 adversarial payloads against the FIXED sandbox_executor."""
import pandas as pd
from sandbox_executor import run_sandboxed
 
df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
 
PAYLOADS = {
    "1_builtins_exposed": "leak = str(__builtins__)",
    "2_subclass_walk": "leak = str(().__class__.__base__.__subclasses__())",
    "3_file_read_via_pandas": (
        "leak = pd.read_csv('C:/Windows/System32/drivers/etc/hosts').to_string()"
    ),
    "4_network_via_pandas": "leak = pd.read_csv('http://example.com').to_string()",
    "5_nested_exec_os_command": "exec(\"import os; leak = os.popen('whoami').read()\")",
    "6_infinite_loop": "\nwhile True:\n    pass\n",
}
 
if __name__ == "__main__":
    print("=" * 70)
    print("TESTING FIXED sandbox_executor.py")
    print("=" * 70)
    for name, payload in PAYLOADS.items():
        timeout = 5 if name == "6_infinite_loop" else 15
        print(f"\n[{name}]" + (" (timeout=5s for speed)" if name == "6_infinite_loop" else ""))
        ok, result, err = run_sandboxed(payload, df, timeout_seconds=timeout)
        if ok:
            leak = result.get("leak", "(no leak var set)")
            print(f"  RESULT: SUCCEEDED (BAD) -> {str(leak)[:200]}")
        else:
            print(f"  RESULT: BLOCKED (GOOD) -> {err}")
