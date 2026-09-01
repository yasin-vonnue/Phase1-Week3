export function setupBackToTop() {
  const button = document.querySelector(".back-to-top");

  if (!button) {
    return;
  }

  function toggleButton() {
    if (window.scrollY > 300) {
      button.hidden = false;
    } else {
      button.hidden = true;
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", toggleButton);
  button.addEventListener("click", scrollToTop);

  toggleButton();
}
