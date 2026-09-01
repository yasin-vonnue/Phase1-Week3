export function setupNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const navLinks = document.querySelector(".navlinks");

  if (!menuToggle || !menuClose || !navLinks) {
    return;
  }

  function getFocusableElements() {
    return navLinks.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
  }

  function openMenu() {
    if (navLinks.classList.contains("is-open")) {
      return;
    }

    navLinks.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");

    const focusableElements = getFocusableElements();
    const firstFocusableElement = focusableElements[0];

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    document.addEventListener("keydown", handleKeydown);
  }

  function closeMenu() {
    if (!navLinks.classList.contains("is-open")) {
      return;
    }

    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.focus();

    document.removeEventListener("keydown", handleKeydown);
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeMenu();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) {
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  menuToggle.addEventListener("click", openMenu);

  menuClose.addEventListener("click", closeMenu);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
