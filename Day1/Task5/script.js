//array filtering and sorting(Given 20 employees objects, chain methods to: filter Engineering with salary>70000)
// map to {name,salary}, sort by salary descending.

const employees = [
  { id: 1, name: "Alice", dept: "Engineering", salary: 50000, yearExp: 3 },
  { id: 2, name: "Bob", dept: "Engineering", salary: 75000, yearExp: 5 },
  { id: 3, name: "Charlie", dept: "Finance", salary: 60000, yearExp: 4 },
  { id: 4, name: "Diana", dept: "Engineering", salary: 90000, yearExp: 7 },
  { id: 5, name: "Ethan", dept: "Marketing", salary: 45000, yearExp: 2 },
  { id: 6, name: "Fiona", dept: "HR", salary: 55000, yearExp: 4 },
  { id: 7, name: "George", dept: "Finance", salary: 80000, yearExp: 6 },
  { id: 8, name: "Hannah", dept: "Engineering", salary: 70000, yearExp: 4 },
  { id: 9, name: "Ian", dept: "Marketing", salary: 52000, yearExp: 3 },
  { id: 10, name: "Julia", dept: "Engineering", salary: 110000, yearExp: 10 },
];

const result = employees
  .filter((e) => e.dept === "Engineering" && e.salary > 70000)
  .map((e) => ({ name: e.name, salary: e.salary }))
  .sort((a, b) => b.salary - a.salary);

console.log(result);

//destructuring of a nested config object into flat variables

const config = {
  server: {
    host: "localhost",
    port: 8080,
  },
  database: {
    credentials: {
      user: "admin",
    },
  },
};

const {
  server: { host, port },
  database: {
    credentials: { user },
  },
} = config;

console.log(host);
console.log(port);
console.log(user);

// Merging objects

const userName = { name: "Arthur Morgan" };

const details = { age: 32, city: "Boston" };

const userDetails = { ...userName, ...details };

console.log(userDetails);

console.log(Object.entries(userDetails));

console.log(Object.keys(userDetails));

console.log(Object.values(userDetails));

// deepClone(obj) that clones a flat object without JSON.parse/stringify

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  return { ...obj };
}

console.log(deepClone(userDetails));
