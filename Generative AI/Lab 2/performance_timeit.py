import json
import random
import shutil
import subprocess
import sys
import timeit
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SORTING_JS = ROOT / "sorting.js"
NODE = shutil.which("node")

if NODE is None:
    raise RuntimeError("Node.js is required to run this benchmark. Install Node.js or add it to PATH.")

if not SORTING_JS.exists():
    raise FileNotFoundError(f"Could not find {SORTING_JS}")

js_source = SORTING_JS.read_text()
if "// Example usage" in js_source:
    js_source = js_source.split("// Example usage")[0]


def run_js_sort(function_name, array):
    payload = json.dumps(array)
    script = f"{js_source}\nconst input = {payload}; const result = {function_name}(input); console.log(JSON.stringify(result));"
    completed = subprocess.run([NODE, "-e", script], capture_output=True, text=True)
    if completed.returncode != 0:
        raise RuntimeError(
            f"Error running {function_name}: {completed.stderr.strip()}"
        )
    return json.loads(completed.stdout.strip())


def benchmark(function_name, array, number=5, repeat=3):
    def target():
        result = run_js_sort(function_name, array)
        if result != sorted(array):
            raise AssertionError(f"{function_name} returned incorrect result")

    timer = timeit.Timer(target)
    times = timer.repeat(repeat=repeat, number=number)
    return min(times) / number


def main():
    random.seed(42)
    sizes = [100, 1000]
    functions = ["quickSort", "mergeSort", "heapSort"]

    print("JavaScript sorting benchmark using timeit")
    print("Node.js path:", NODE)
    print("Source file:", SORTING_JS.name)
    print()

    for size in sizes:
        array = [random.randint(-10000, 10000) for _ in range(size)]
        print(f"Array size: {size}")
        for function_name in functions:
            elapsed = benchmark(function_name, array, number=3, repeat=3)
            print(f"  {function_name:10s}: {elapsed:.6f} sec per run")
        print()

    print("Benchmark complete.")


if __name__ == "__main__":
    main()
