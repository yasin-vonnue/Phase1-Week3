document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const closeBtn = document.querySelector(".close");

  let currentIndex = 0;

  const focusables = [prevBtn, nextBtn, closeBtn];

  function showImage(index) {
    currentIndex = index;

    lightboxImage.src = galleryImages[index].src;
    lightboxImage.alt = galleryImages[index].alt;
  }

  function openLightBox(index) {
    showImage(index);

    lightbox.classList.remove("hidden");

    document.body.classList.add("no-scroll");

    closeBtn.focus();
  }

  function closeLightBox() {
    lightbox.classList.add("hidden");

    document.body.classList.remove("no-scroll");
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      openLightBox(index);
    });
  });

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;

    showImage(currentIndex);
  });

  closeBtn.addEventListener("click", closeLightBox);

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;

    switch (e.key) {
      case "ArrowLeft":
        prevBtn.click();
        break;

      case "ArrowRight":
        nextBtn.click();
        break;

      case "Escape":
        closeLightBox();
        break;

      case "Tab":
        e.preventDefault();

        const current = focusables.indexOf(document.activeElement);

        let next;

        if (e.shiftKey) {
          next = (current - 1 + focusables.length) % focusables.length;
        } else {
          next = (current + 1) % focusables.length;
        }

        focusables[next].focus();

        break;
    }
  });

  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      nextBtn.click();
    } else if (endX - startX > 50) {
      prevBtn.click();
    }
  });
});
