import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent
SORTING_JS = ROOT / "sorting.js"

NODE = shutil.which("node")


def require_node_available():
    if NODE is None:
        pytest.skip("Node.js is required to run these tests")


def run_js_function(function_name, array):
    require_node_available()

    js_code = SORTING_JS.read_text()
    if "// Example usage" in js_code:
        js_code = js_code.split("// Example usage")[0]

    invocation = f"const input = {json.dumps(array)}; console.log(JSON.stringify({function_name}(input)));"
    full_script = js_code + "\n" + invocation

    proc = subprocess.run([NODE, "-e", full_script], capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(
            f"Node execution failed for {function_name}: {proc.stderr.strip()}"
        )

    return json.loads(proc.stdout.strip())


@pytest.mark.parametrize(
    "function_name",
    ["quickSort", "mergeSort", "heapSort"],
)
def test_empty_array(function_name):
    assert run_js_function(function_name, []) == []


@pytest.mark.parametrize("function_name", ["quickSort", "mergeSort", "heapSort"])
def test_sorted_array(function_name):
    arr = [1, 2, 3, 4, 5]
    assert run_js_function(function_name, arr) == arr


@pytest.mark.parametrize("function_name", ["quickSort", "mergeSort", "heapSort"])
def test_duplicates(function_name):
    arr = [5, 3, 1, 2, 2, 5, 1]
    assert run_js_function(function_name, arr) == sorted(arr)


@pytest.mark.parametrize("function_name", ["quickSort", "mergeSort", "heapSort"])
def test_reverse_sorted_array(function_name):
    arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    assert run_js_function(function_name, arr) == sorted(arr)


@pytest.mark.parametrize("function_name", ["quickSort", "mergeSort", "heapSort"])
def test_large_random_array(function_name):
    import random

    random.seed(42)
    arr = [random.randint(-1000, 1000) for _ in range(2000)]
    assert run_js_function(function_name, arr) == sorted(arr)


@pytest.mark.parametrize("function_name", ["quickSort", "mergeSort", "heapSort"])
def test_large_sorted_array(function_name):
    arr = list(range(2000))
    assert run_js_function(function_name, arr) == arr
