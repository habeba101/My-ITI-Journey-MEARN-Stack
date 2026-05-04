# Project Documentation

## Overview

This project demonstrates sorting algorithm implementation and comparison using JavaScript and Python-based testing. It includes:

- `QuickSort.js` — original Quick Sort implementation
- `comparing.js` — recursive and iterative Quick Sort implementations
- `sorting.js` — Quick Sort, Merge Sort, and Heap Sort implementations with comparison notes
- `quick-sort.html` and `Script.js` — web UI for user input and Quick Sort execution
- `test_sorting.py` — pytest unit tests for sorting functions
- `performance_timeit.py` — Python benchmark using `timeit`
- `README.md` — project summary and comparison notes
- `requirements.txt` — Python dependency manifest
- `.github/workflows/python-node-test.yml` — GitHub Actions workflow for automated tests

## Development Process

1. Implemented the base sorting algorithm in `QuickSort.js`.
2. Improved the Quick Sort implementation for better memory and recursion handling.
3. Added a comparison file `comparing.js` with both recursive and iterative Quick Sort variants.
4. Built a broader `sorting.js` file that includes Quick Sort, Merge Sort, and Heap Sort.
5. Created a user-facing web page `quick-sort.html` with `Script.js` for input parsing, error handling, and result display.
6. Added unit tests using `pytest` in `test_sorting.py`, covering:
   - empty arrays
   - sorted arrays
   - duplicate values
   - reverse-sorted arrays
   - large random arrays
   - large sorted arrays
7. Added a Python benchmarking script `performance_timeit.py` to measure the JavaScript sorting functions using `timeit`.
8. Added a `requirements.txt` file to manage the Python dependency `pytest`.
9. Configured GitHub Actions via `.github/workflows/python-node-test.yml` for CI testing on push and pull requests.

## How Copilot Assisted

GitHub Copilot helped accelerate the development by:

- suggesting improved in-place Quick Sort and partitioning logic
- providing a structured comparison of sorting algorithms and their complexity
- generating the frontend HTML/CSS/JavaScript page for user input and output
- creating Python test scaffolding and performance benchmark scripts
- recommending proper error handling for invalid input and edge cases
- ensuring the project included both developer-facing docs and CI automation

Copilot acted as an assistant through each iteration, transforming user requests into code, file scaffolding, and documentation quickly.

## Performance Comparisons

### Quick Sort
- average time complexity: `O(n log n)`
- worst-case complexity: `O(n^2)` with bad pivot choices
- in-place when implemented with partitioning
- space complexity: `O(log n)` average recursion/stack depth

### Merge Sort
- time complexity: `O(n log n)` for both average and worst cases
- stable sort
- space complexity: `O(n)` due to auxiliary arrays

### Heap Sort
- time complexity: `O(n log n)` for average and worst cases
- in-place sort
- not stable
- typically a bit slower in practice than Quick Sort on average due to larger constant factors

### Practical Benchmarking

The `performance_timeit.py` script measures how the JavaScript sorting functions behave on different input sizes. It runs each implementation multiple times and reports average execution times.

This benchmark approach helps demonstrate the practical differences between algorithm choice and highlights the importance of correct implementation and pivot selection.

## Key Learnings

- Quick Sort is a strong general-purpose algorithm, but it must be implemented carefully to avoid worst-case recursion and memory overhead.
- Iterative versions and tail-recursion optimizations can make recursive algorithms safer for larger input sizes.
- Merge Sort is reliable for worst-case performance and stable sorting, but it uses more memory.
- Heap Sort offers consistent `O(n log n)` behavior and in-place sorting, but it is rarely the fastest choice in real-world JavaScript engines.
- Good error handling is essential in user-facing interfaces to prevent invalid input from crashing the application.
- Automated testing and CI workflows provide confidence that the code works correctly across edge cases and future changes.
- Combining JavaScript implementation, Python testing, and documentation creates a more complete project that is easier to maintain and share.

## Files and Purpose

- `QuickSort.js` — baseline Quick Sort algorithm
- `comparing.js` — demonstration of recursive vs iterative Quick Sort
- `sorting.js` — comparison of multiple sorting algorithms
- `quick-sort.html` + `Script.js` — interactive sorting web page
- `test_sorting.py` — validation of sorting correctness using pytest
- `performance_timeit.py` — benchmark script for performance comparison
- `README.md` — concise project summary and usage guide
- `Documentation.md` — process, rationale, and learnings documentation
- `requirements.txt` — dependency management for Python testing
- `.github/workflows/python-node-test.yml` — automated test workflow for GitHub
