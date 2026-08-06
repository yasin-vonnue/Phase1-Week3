class HttpError extends Error {
  constructor(response) {
    super(`HTTP Error ${response.status}: ${response.statusText}`);
    this.name = "HttpError";
    this.response = response;
    this.status = response.status;
  }
}

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new HttpError(response);
  }

  return response.json();
}

const controller = new AbortController();
const timeoutId = setTimout(() => controller.abort(), 5000);

(async () => {
  try {
    const response = await fetch({
      signal: controller.signal,
    });

    console.log("Status:", response.status, response.statusText);

    console.log("Headers:");
    response.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    const posts = await response.json();
    console.log("Posts:", posts);

    const postsViaWrapper = await fetchJSON(
      "https://jsonplaceholder.typicode.com/posts",
      {
        signal: controller.signal,
      },
    );

    console.log("Fetched via fetchJSON:", postsViaWrapper);

    const createdPost = await fetchJSON(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "My New Post",
          body: JSON.stringify({
            title: "My New Post",
            body: "This is a sample post.",
            userId: 1,
          }),
          signal: controller.signal,
        }),
      },
    );

    console.log("Created resource:", createdPost);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log(
        "The request took longer than 5 seconds and was cancelled. Please try again.",
      );
    } else if (err instanceof HttpError) {
      console.error(
        `Request failed with status ${err.status}: ${err.response.statusText}`,
      );
    } else {
      console.error("Unexpected error:", err);
    }
  } finally {
    clearTimeout(timeoutId);
  }
})();
