export function setupReadingProgress() {
  const progressBar = document.querySelector(".reading-progress");

  if (!progressBar) {
    return;
  }

  function updateProgress() {
    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true,
  });

  updateProgress();
}
