function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function filterCards(event) {
  const query = event.target.value.toLowerCase();
  const cards = document.querySelectorAll(".service-card");
  const clearBtn = document.querySelector("#clear-search");
  const noResultMessage = document.querySelector("#noResults");

  clearBtn.style.display = query !== "" ? "block" : "none";

  const safeQuery = query.replace(/[.*+?^${}()[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${safeQuery})`, "gi");

  let hasMatches = false;

  cards.forEach((card) => {
    const nameElement = card.querySelector(".service-name");

    if (!nameElement.dataset.originalName) {
      nameElement.dataset.originalName = nameElement.textContent;
    }

    const originalName = nameElement.dataset.originalName;

    if (query === "") {
      card.style.display = "";
      nameElement.innerHTML = originalName;
      hasMatches = true;
    } else if (originalName.toLowerCase().includes(query)) {
      card.style.display = "";

      nameElement.innerHTML = originalName.replace(
        regex,
        '<span class="highlight">$1</span>',
      );
      hasMatches = true;
    } else {
      card.style.display = "none";
    }
  });

  noResultMessage.style.display = hasMatches ? "none" : "block";
}

function resetSearch() {
  const searchInput = document.querySelector("#service-name");
  const clearBtn = document.querySelector("#clear-search");
  const noResultMessage = document.querySelector("#noResults");
  const cards = document.querySelectorAll(".service-card");

  searchInput.value = "";
  clearBtn.style.display = "none";
  noResultMessage.style.display = "none";

  cards.forEach((card) => {
    card.style.display = "";
    const nameElement = card.querySelector(".service-name");
    if (nameElement.dataset.originalName) {
      nameElement.innerHTML = nameElement.dataset.originalName;
    }
  });
}

const searchInput = document.querySelector("#service-name");
const clearButton = document.querySelector("#clear-search");

searchInput.addEventListener("keyup", debounce(filterCards, 300));
clearButton.addEventListener("click", resetSearch);
