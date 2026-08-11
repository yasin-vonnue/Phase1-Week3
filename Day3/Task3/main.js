//Impure updateUser(mutates)

function updateUser(users, id, changes) {
  const user = users.find((u) => u.id === id);
  if (user) {
    Object.assign(user, changes);
  }
}

const users = [
  { id: 1, name: "Arthur", age: 25 },

  { id: 2, name: "Dutch", age: 39 },
];

updateUser(users, 1, { age: 28 });

console.log("After impure update:", users);

//Pure updateUser

function updateUserPure(users, id, changes) {
  return users.map((user) => (user.id === id ? { ...user, ...changes } : user));
}

const originalUsers = [
  { id: 1, name: "Micah", age: 25 },
  { id: 2, name: "Jack", age: 19 },
];

const updatedUsers = updateUserPure(originalUsers, 2, { age: 31 });

console.log("Original unchanged:", originalUsers);
console.log("Updated copy:", updatedUsers);

// Five-step pure pipeline

const parseCSV = (csv) =>
  csv
    .trim()
    .split("\n")
    .map((line) => line.split(","));

const validateRows = (rows) =>
  rows.map((r) => ({
    row: r,
    valid: r.length === 2 && r[0] && !isNaN(Number(r[1])),
  }));

const transformRows = (rows) =>
  rows.map((r) => ({
    ...r,
    row: [r.row[0].toUpperCase(), Number(r.row[1])],
  }));

const filterInvalid = (rows) => rows.filter((r) => r.valid);

const formatOutput = (rows) =>
  rows.map((r) => `${r.row[0]}: ${r.row[1]}`).join("\n");

//pipeline

const csv = `arthur,30
bob,25
invalid`;

const output = formatOutput(
  filterInvalid(transformRows(validateRows(parseCSV(csv)))),
);

console.log(output);

// deepFreeze

function deepFreeze(obj) {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj);

    Object.keys(obj).forEach((key) => {
      deepFreeze(obj[key]);
    });
  }

  return obj;
}

const settings = {
  theme: {
    color: "blue",
  },

  options: {
    darkmode: true,
  },
};

deepFreeze(settings);

console.log("Frozen:", Object.isFrozen(settings));
console.log("Nested frozen:", Object.isFrozen(settings.theme));
console.log("Nested frozen:", Object.isFrozen(settings.options));
