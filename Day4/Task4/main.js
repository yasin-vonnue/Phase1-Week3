//Promise Chain functions

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

// Promise Chain

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
    console.log("Order Details:", details);
  })
  .catch((err) => {
    console.error("Chain Error:", err);
  });

// Using async/await

async function loadOrder() {
  try {
    const user = await getUser();
    console.log("User:", user);

    const orders = await getOrders(user.id);
    console.log("Orders:", orders);

    const details = await getOrderDetail(orders[0].orderId);
    console.log("Order Details:", details);
  } catch (err) {
    console.error("Chain Error:", err);
  }
}

// Helper function

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}`);
  }

  return response.json();
}

async function loadDashboard(userId) {
  try {
    const [user, posts, todos] = await Promise.all([
      fetchJSON(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetchJSON(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
      fetchJSON(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
    ]);

    console.log("User:", user);
    console.log("Posts:", posts.length);
    console.log("Todos:", todos.length);

    try {
      if (posts.length === 0) {
        throw new Error("No posts found.");
      }

      const comments = await fetchJSON(
        `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`,
      );

      console.log("Comments:", comments.length);

      return {
        user,
        posts,
        todos,
        comments,
      };
    } catch (err) {
      console.error("Comment Error:", err.message);
    }
  } catch (err) {
    console.error("Dashboard Error:", err.message);
  }
}

//sequential vs parallel

async function loadSequential() {
  console.time("Sequential");

  const user = await fetchJSON("https://jsonplaceholder.typicode.com/users/1");

  const posts = await fetchJSON(
    "https://jsonplaceholder.typicode.com/posts?userId=1",
  );

  const todos = await fetchJSON(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
  );

  console.timeEnd("Sequential");

  return { user, posts, todos };
}

async function loadParallel() {
  console.time("Parallel");

  const [user, posts, todos] = await Promise.all([
    fetchJSON("https://jsonplaceholder.typicode.com/users/1"),
    fetchJSON("https://jsonplaceholder.typicode.com/posts?userId=1"),
    fetchJSON("https://jsonplaceholder.typicode.com/todos?userId=1"),
  ]);

  console.timeEnd("Parallel");

  return { user, posts, todos };
}

//forEach Async Bug

async function forEachBug() {
  const ids = [1, 2, 3];

  ids.forEach(async (id) => {
    const user = await fetchJSON(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    console.log(user.name);
  });

  console.log("Finished (printed before users)");
}

// Fix using for...of

async function forOfSolution() {
  const ids = [1, 2, 3];

  for (const id of ids) {
    const user = await fetchJSON(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    console.log(user.name);
  }

  console.log("Finished");
}

// Fix using Promise.all()

async function promiseAllSolution() {
  const ids = [1, 2, 3];

  const users = await Promise.all(
    ids.map(async (id) => {
      return fetchJSON(`https://jsonplaceholder.typicode.com/users/${id}`);
    }),
  );

  users.forEach((user) => {
    console.log(user.name);
  });

  console.log("Finished");
}

// main function

async function main() {
  await loadOrder();

  await loadDashboard(1);

  await loadSequential();

  await loadParallel();

  await forEachBug();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  await forOfSolution();

  await promiseAllSolution();
}

main();
