import { fetchJSON } from "../utils.js";

export function setupServices() {
  const servicesList = document.querySelector("#services-list");
  const searchInput = document.querySelector("#service-search");
  const categorySelect = document.querySelector("#service-category");
  const loading = document.querySelector("#services-loading");
  const error = document.querySelector("#services-error");
  const retryButton = document.querySelector("#services-retry");

  if (
    !servicesList ||
    !searchInput ||
    !categorySelect ||
    !loading ||
    !error ||
    !retryButton
  ) {
    return;
  }

  let services = [];

  function showLoading() {
    loading.hidden = false;
    error.hidden = true;
    servicesList.innerHTML = "";
  }

  function hideLoading() {
    loading.hidden = true;
  }

  function showError() {
    loading.hidden = true;
    error.hidden = false;
    servicesList.innerHTML = "";
  }

  function createCategory(title) {
    return title.split(" ")[0];
  }

  function renderServices() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredServices = services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm) ||
        service.body.toLowerCase().includes(searchTerm);

      const category = createCategory(service.title);

      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (!filteredServices.length) {
      servicesList.innerHTML = `
        <p class="no-results">
          No services match your search.
        </p>
      `;
      return;
    }

    servicesList.innerHTML = filteredServices
      .map(
        (service) => `
          <article class="service-card card">
            <h3>${service.title}</h3>

            <p>${service.body}</p>

            <p class="service-category">
              Category: ${createCategory(service.title)}
            </p>
          </article>
        `,
      )
      .join("");
  }

  function populateCategories() {
    const categories = [
      ...new Set(services.map((service) => createCategory(service.title))),
    ];

    categories.forEach((category) => {
      const option = document.createElement("option");

      option.value = category;
      option.textContent = category;

      categorySelect.append(option);
    });
  }

  async function loadServices() {
    showLoading();

    try {
      services = await fetchJSON("https://jsonplaceholder.typicode.com/posts");

      services = services.slice(0, 12);

      populateCategories();
      renderServices();

      hideLoading();
    } catch (error) {
      console.error("Failed to load services:", error);
      showError();
    }
  }

  searchInput.addEventListener("input", renderServices);
  categorySelect.addEventListener("change", renderServices);
  retryButton.addEventListener("click", loadServices);

  loadServices();
}
