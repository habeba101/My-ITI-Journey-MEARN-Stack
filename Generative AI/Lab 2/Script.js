function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array of numbers.");
  }
  if (arr.length <= 1) return arr.slice();

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (const value of arr) {
    if (value < pivot) {
      left.push(value);
    } else if (value > pivot) {
      right.push(value);
    } else {
      equal.push(value);
    }
  }

  return quickSort(left).concat(equal, quickSort(right));
}

function parseInput(value) {
  if (typeof value !== "string") {
    throw new Error("Input must be a comma-separated string of numbers.");
  }

  const items = value.split(",");
  const numbers = items
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (numbers.length === 0) {
    return [];
  }

  return numbers.map((item) => {
    const num = Number(item);
    if (Number.isNaN(num)) {
      throw new Error(`Invalid number: '${item}'. Please enter only numeric values.`);
    }
    return num;
  });
}

function formatOutput(array) {
  if (!Array.isArray(array)) return "[]";
  return array.length === 0 ? "[]" : `[ ${array.join(", ")} ]`;
}

function showResult(message) {
  errorElement.textContent = "";
  outputElement.textContent = message;
}

function showError(message) {
  errorElement.textContent = message;
  outputElement.textContent = "Sorted result will appear here.";
}

const sortButton = document.getElementById("sortButton");
const inputElement = document.getElementById("inputArray");
const outputElement = document.getElementById("output");
const errorElement = document.getElementById("errorMessage");

if (!sortButton || !inputElement || !outputElement || !errorElement) {
  throw new Error("Missing required page elements for sorting functionality.");
}

sortButton.addEventListener("click", () => {
  try {
    const input = inputElement.value;
    const array = parseInput(input);

    if (array.length === 0) {
      showResult("No numbers provided. Please enter a comma-separated list of numbers.");
      return;
    }

    const sorted = quickSort(array);
    showResult(`Sorted output: ${formatOutput(sorted)}`);
  } catch (error) {
    showError(error.message);
  }
});
