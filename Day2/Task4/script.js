class ValidationError extends Error {
  constructor(message, field, statusCode = 409) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.statusCode = statusCode;
  }
}

function parseUserInput(input) {
  if (typeof input !== "object" || input === null)
    throw new TypeError("Input must be an object");

  if (input.age < 0 || input.age > 120) throw new RangeError("Invalid age");

  if (!input.name) throw new ValidationError("Name is required", "name");

  return input;
}

function run() {
  try {
    parseUserInput({
      name: "",
      age: 25,
    });
    console.log("Valid");
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log("Validation:", err.field, err.message);
    } else if (err instanceof TypeError) {
      console.log("Type:", err.message);
    } else if (err instanceof RangeError) {
      console.log("Range:", err.message);
    } else {
      console.log(err);
    }
  }
}

const overlay = document.getElementById("overlay");

function showError(msg) {
  overlay.style.display = "block";
  overlay.textContent = msg;
}

window.onerror = function (message) {
  showError(message);
};

window.addEventListener("unhandledrejection", (e) => {
  showError(e.reason);
});

// parseUserInput("hello");

// parseUserInput({
//   name: "John",
//   age: 150,
// });

// parseUserInput({
//   name: "",
//   age: 25,
// });

// unknownFunction();
