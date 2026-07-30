//if-else statements

const score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}

console.log(grade);

//Switch statement

const pet = "dog";
let sound;

switch (pet) {
  case "cat":
    sound = "meow";
    break;

  case "dog":
    sound = "woof";
    break;

  default:
    sound = "unknown";
}

console.log(sound);

//Ternary Chain

const age = 20;

const type = age < 13 ? "child" : age < 20 ? "teen" : "adult";

console.log(type);

//Lookup Object

const role = "admin";

const corePermissions = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  guest: ["read"],
};

const access = corePermissions[role] || ["none"];

console.log(access);

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
