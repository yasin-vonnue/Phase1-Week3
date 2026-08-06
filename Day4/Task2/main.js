const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve("Promise 1 resolved"), 1000);
});

const promise2 = new Promise((_, reject) => {
  setTimeout(() => reject("Promise 2 rejected"), 1500);
});

const promise3 = new Promise((resolve) => {
  setTimeout(() => resolve("Promise 3 resolved"), 700);
});

const promise4 = new Promise((_, reject) => {
  setTimeout(() => reject("Promise 4 rejected"), 1200);
});

const promise5 = new Promise((resolve) => {
  setTimeout(() => resolve("Promise 5 resolved"), 500);
});

// Chain dependent Promises

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 101, name: "Arthur" });
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === undefined) {
        reject("User ID is undefined");
      } else {
        resolve([{ orderId: 501 }, { orderId: 502 }]);
      }
    }, 1000);
  });
}

function getOrderDetail(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId,
        product: "Laptop",
        price: 1200,
      });
    }, 1000);
  });
}

getUser()
  .then((user) => {
    console.log("User:", user);
    return getOrders(user.id);
  })
  .then((orders) => {
    console.log("Orders:", orders);
    return getOrderDetail(orders[0].orderId);
  })
  .then((details) => {
    console.log("Order Detaisl:", details);
  })
  .catch((err) => {
    console.error("Chain Error:", err);
  });

//Promise.all

console.time("Promise.all");

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve("Task A"), 1000)),
  new Promise((resolve) => setTimeout(() => resolve("Task B"), 2000)),
  new Promise((resolve) => setTimeout(() => resolve("Task C"), 1500)),
])
  .then((results) => {
    console.timeEnd("Promise.all");
    console.log("Promise.all results:", results);
  })
  .catch(console.error);

// Promise.allSettled

Promise.allSettled([
  new Promise((resolve) => setTimeout(() => resolve("Success"), 1000)),

  new Promise((_, reject) => setTimeout(() => reject("Failure"), 1200)),
]).then((results) => {
  console.log("Promise.allSettled:");
  console.log(results);
});

// // Promise.race

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("Fast response"), 1000)),
  new Promise((resolve) => setTimeout(() => resolve("Slow response"), 3000)),
  new Promise((_, reject) => setTimeout(() => reject("Very fast error"), 1500)),
])

  .then((result) => {
    console.log("Promise.race winner:", result);
  })
  .catch((err) => {
    console.error("Promise.race error:", err);
  });
