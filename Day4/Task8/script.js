const searchInput = document.querySelector("#service-search");
const categoryFilter = document.querySelector("#category-filter");

const serviceCards = document.querySelectorAll(".service-card");
const noResults = document.querySelector("#no-results");

function filterServices() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const categoryValue = categoryFilter.value;

  let visibleCount = 0;

  serviceCards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch =
      title.includes(searchValue) || description.includes(searchValue);

    const matchesCategory = !categoryValue || category === categoryValue;

    const shouldShow = matchesSearch && matchesCategory;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
}

function updateURL() {
  const params = new URLSearchParams();

  if (searchInput.value.trim()) {
    params.set("search", searchInput.value.trim());
  }

  if (categoryFilter.value) {
    params.set("category", categoryFilter.value);
  }

  const queryString = params.toString();

  const newURL = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  history.pushState({}, "", newURL);
}

function restoreFromURL() {
  const params = new URLSearchParams(window.location.search);

  searchInput.value = params.get("search") || "";
  categoryFilter.value = params.get("category") || "";

  filterServices();
}

searchInput.addEventListener("input", () => {
  filterServices();
  updateURL();
});

categoryFilter.addEventListener("change", () => {
  filterServices();
  updateURL();
});

window.addEventListener("popstate", () => {
  restoreFromURL();
});

restoreFromURL();
