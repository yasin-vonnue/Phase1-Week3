//if-else statements

function gradeIfElse(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

//Switch statement

function gradeSwitch(score) {
  switch (true) {
    case score >= 90:
      return "A";
    case score >= 80:
      return "B";
    case score >= 70:
      return "C";
    case score >= 60:
      return "D";
    default:
      return "F";
  }
}

//Ternary Chain

function gradeTernary(score) {
  return score >= 90
    ? "A"
    : score >= 80
      ? "B"
      : score >= 70
        ? "C"
        : score >= 60
          ? "D"
          : "F";
}

//Lookup Object

function gradeLookup(score) {
  const key =
    score >= 90
      ? "A"
      : score >= 80
        ? "B"
        : score >= 70
          ? "C"
          : score >= 60
            ? "D"
            : "F";

  const grades = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    F: "F",
  };

  return grades[key];
}

const score = 85;

console.log(gradeIfElse(score));
console.log(gradeSwitch(score));
console.log(gradeTernary(score));
console.log(gradeLookup(score));

const ITERATIONS = 1_000_000;

console.time("If/Else");
for (let i = 0; i < ITERATIONS; i++) {
  gradeIfElse(85);
}
console.timeEnd("If/Else");

console.time("Switch");
for (let i = 0; i < ITERATIONS; i++) {
  gradeSwitch(85);
}
console.timeEnd("Switch");

console.time("Ternary");
for (let i = 0; i < ITERATIONS; i++) {
  gradeTernary(85);
}
console.timeEnd("Ternary");

console.time("Lookup Object");
for (let i = 0; i < ITERATIONS; i++) {
  gradeLookup(85);
}
console.timeEnd("Lookup Object");

//processQueue

function processQueue(items) {
  let queue = [...items];

  console.log("1. while loop");
  while (queue.length > 0) {
    console.log(queue.shift());
  }

  console.log("2. do...while loop");
  let i = 0;
  do {
    console.log(items[i]);
    i++;
  } while (i < items.length);

  console.log("3. for...of over Map");
  const map = new Map([
    [1, "Apple"],
    [2, "Banana"],
    [3, "Mango"],
  ]);

  for (const [key, value] of map) {
    console.log(key, value);
  }
}

processQueue(["Task 1", "Task 2", "Task 3"]);

function validateUser(user) {
  return (
    user && user.email && user.email.includes("@") && user.role === "admin"
  );
}

console.log(validateUser({ email: "admin@example.com", role: "admin" }));
console.log(validateUser({ email: "invalidemail", role: "admin" }));
console.log(validateUser(null));

//before(deeply nested)

function validateUser(user) {
  if (user) {
    if (user.email) {
      if (user.email.includes("@")) {
        if (user.role === "admin") {
          return "Valid Admin";
        } else {
          return "Not an Admin";
        }
      } else {
        return "Invalid Email";
      }
    } else {
      return "Email Missing";
    }
  } else {
    return "User Missing";
  }
}

//After (using early returns)

function validateUsers(user) {
  if (!user) return "User Missing";
  if (!user.email) return "Email Missing";
  if (!user.email.includes("@")) return "Invalid Email";
  if (user.role !== "admin") return "Not an Admin";

  return "Valid Admin";
}
