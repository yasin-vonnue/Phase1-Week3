export function setupDarkMode() {
  const toggleButton = document.querySelector(".dark-mode-toggle");

  if (!toggleButton) {
    return;
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.setAttribute("aria-label", "Switch to light mode");
  }

  function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle("dark-mode");

    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      toggleButton.setAttribute("aria-label", "Switch to light mode");
    } else {
      localStorage.setItem("theme", "light");
      toggleButton.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  toggleButton.addEventListener("click", toggleDarkMode);
}
