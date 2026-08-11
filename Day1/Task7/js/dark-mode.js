document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  function updateButtonState() {
    const isDark = html.getAttribute("data-theme") === "dark";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", isDark);
      themeToggle.textContent = isDark
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
    }
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    html.setAttribute("data-theme", "dark");
  }

  updateButtonState();

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";

    if (isDark) {
      html.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }

    updateButtonState();
  });
});
