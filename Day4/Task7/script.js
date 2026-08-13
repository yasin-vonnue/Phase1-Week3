const postsContainer = document.querySelector("#posts");
const loading = document.querySelector("#loading");
const sentinel = document.querySelector("#sentinel");

const endMessage = document.querySelector("#end-message");

const error = document.querySelector("#error");
const retryButton = document.querySelector("#retry");

let start = 0;
let isLoading = false;
let hasMore = true;

async function fetchPosts() {
  if (isLoading || !hasMore) {
    return;
  }

  isLoading = true;

  loading.hidden = false;
  error.hidden = true;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts.");
    }

    const posts = await response.json();

    displayPosts(posts);

    start += 10;

    if (start >= 100) {
      hasMore = false;
      endMessage.hidden = false;
    }
  } catch (err) {
    error.hidden = false;
  } finally {
    isLoading = false;
    loading.hidden = true;
  }
}

function displayPosts(posts) {
  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("post");

    const title = document.createElement("h2");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    article.append(title, body);

    postsContainer.append(article);
  });
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    fetchPosts();
  }
});

observer.observe(sentinel);

retryButton.addEventListener("click", () => {
  fetchPosts();
});

fetchPosts();
