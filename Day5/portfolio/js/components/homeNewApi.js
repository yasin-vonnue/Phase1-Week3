import { fetchJSON } from "../utils.js";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export function setupHomeNewAPI() {
  const grid = document.querySelector("#latest-posts-list");
  const loading = document.querySelector("#latest-posts-loading");
  const errorContainer = document.querySelector("#latest-posts-error");
  const retryButton = document.querySelector("#latest-posts-retry");

  if (!grid || !loading || !errorContainer || !retryButton) {
    return;
  }

  function showSkeletons() {
    loading.hidden = false;
    errorContainer.hidden = true;
    grid.innerHTML = "";
  }

  function showError() {
    loading.hidden = true;
    errorContainer.hidden = false;
    grid.innerHTML = "";
  }

  async function loadNews() {
    showSkeletons();

    try {
      const posts = await fetchJSON(API_URL);

      const latestPosts = posts.slice(-3).reverse();

      grid.innerHTML = latestPosts
        .map(
          (post) => `
            <article class="card news-card">
              <span class="news-label">Latest News</span>

              <h3>${post.title}</h3>

              <p>${post.body}</p>

              <a href="./services.html">
                Read More
              </a>
            </article>
          `,
        )
        .join("");

      loading.hidden = true;
      errorContainer.hidden = true;
    } catch (error) {
      console.error("Failed to load latest news:", error);
      showError();
    }
  }

  retryButton.addEventListener("click", loadNews);

  loadNews();
}
