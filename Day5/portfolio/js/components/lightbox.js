export function setupLightbox() {
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const closeButton = document.querySelector(".close");

  if (
    !galleryImages.length ||
    !lightbox ||
    !lightboxImage ||
    !prevButton ||
    !nextButton ||
    !closeButton
  ) {
    return;
  }

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let previouslyFocusedElement = null;

  const focusableElements = [prevButton, nextButton, closeButton];

  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
  }

  function openLightbox(index) {
    previouslyFocusedElement = galleryImages[index];

    showImage(index);

    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");

    closeButton.focus();

    document.addEventListener("keydown", handleKeydown);
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");

    document.removeEventListener("keydown", handleKeydown);

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  function showPrevious() {
    showImage(currentIndex - 1);
  }

  function showNext() {
    showImage(currentIndex + 1);
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
      return;
    }

    if (event.key === "ArrowRight") {
      showNext();
      return;
    }

    if (event.key !== "Tab") {
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

  function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
  }

  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance < 0) {
      showNext();
    } else {
      showPrevious();
    }
  }

  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  prevButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("touchstart", handleTouchStart);
  lightbox.addEventListener("touchend", handleTouchEnd);
}
