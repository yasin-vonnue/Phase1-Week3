import { fetchJSON, debounce } from "../utils.js";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export function setupServicesAPI() {
  const grid = document.querySelector("#services-grid");
  const searchInput = document.querySelector("#service-search");
  const categorySelect = document.querySelector("#service-category");
  const status = document.querySelector("#services-status");

  if (!grid || !searchInput || !categorySelect || !status) {
    return;
  }

  let services = [];

  const categories = ["Development", "Cloud", "Security", "Support", "Design"];

  function showSkeletons() {
    grid.innerHTML = Array.from(
      { length: 6 },
      () => `
        <article class="api-skeleton service-skeleton">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </article>
      `,
    ).join("");
  }

  function getCategory(post) {
    return categories[(post.id - 1) % categories.length];
  }

  function renderCategories() {
    categorySelect.innerHTML = `
      <option value="all">All Categories</option>

      ${categories
        .map(
          (category) => `
            <option value="${category}">
              ${category}
            </option>
          `,
        )
        .join("")}
    `;
  }

  function renderServices() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredServices = services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (!filteredServices.length) {
      grid.innerHTML = `
        <p class="no-results">
          No services found.
        </p>
      `;
      return;
    }

    grid.innerHTML = filteredServices
      .map(
        (service) => `
          <article class="card service-card">
            <span class="service-category">
              ${service.category}
            </span>

            <h3>${service.title}</h3>

            <p>${service.description}</p>
          </article>
        `,
      )
      .join("");
  }

  function showError() {
    status.innerHTML = `
      <div class="api-error" role="alert">
        <p>Unable to load services.</p>

        <button type="button" id="services-retry">
          Retry
        </button>
      </div>
    `;

    document
      .querySelector("#services-retry")
      ?.addEventListener("click", loadServices);
  }

  async function loadServices() {
    status.textContent = "Loading services...";
    showSkeletons();

    try {
      const posts = await fetchJSON(API_URL);

      services = posts.map((post) => ({
        ...post,
        category: getCategory(post),
        description: post.body,
      }));

      renderCategories();
      renderServices();

      status.textContent = "";
    } catch (error) {
      console.error("Failed to load services:", error);

      grid.innerHTML = "";
      showError();
    }
  }

  searchInput.addEventListener("input", debounce(renderServices, 300));

  categorySelect.addEventListener("change", renderServices);

  loadServices();
}
