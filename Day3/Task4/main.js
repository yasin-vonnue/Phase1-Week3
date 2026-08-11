const orders = [
  { id: 101, items: ["Apple", "Banana"] },
  { id: 102, items: ["Orange"] },
  { id: 103, items: ["Milk", "Bread"] },
];

const allItems = orders.flatMap((order) =>
  order.items.map((item) => ({
    orderId: order.id,
    item,
  })),
);

console.log("All items:", allItems);

// findLast & findLastIndex

const logs = [
  { level: "info", message: "Started" },
  { level: "error", message: "Network error" },
  { level: "info", message: "Retrying" },
  { level: "error", message: "Database error" },
];

const lastError = logs.findLast((log) => log.level === "error");
const lastErrorIndex = logs.findLastIndex((log) => log.level === "error");

console.log("Last error:", lastError);
console.log("Last error index:", lastErrorIndex);

// chunk(arr, size)

function chunk(arr, size) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));

// zip(...arrays)

function zip(...arrays) {
  const maxLength = Math.max(...arrays.map((a) => a.length));

  return Array.from({ length: maxLength }, (_, i) =>
    arrays.map((arr) => arr[i]),
  );
}

console.log(zip(["A", "B", "C"], [1, 2, 3], ["x", "y"]));

function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}

const people = [
  { name: "John", age: 22 },
  { name: "Arthur", age: 30 },
  { name: "Charlie", age: 22 },
];

console.log(groupBy(people, (person) => person.age));

const calendar = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  name: new Date(2025, i).toLocaleString("default", { month: "long" }),
}));

console.log(calendar);
