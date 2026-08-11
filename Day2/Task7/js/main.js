document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    ".hero-content, .section-title, .testimonials h2, .features .card, .testimonials .card",
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => target.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  targets.forEach((target) => observer.observe(target));

  const progressBar = document.querySelector(".reading-progress");
  const backToTop = document.getElementById("backToTop");

  if (progressBar) {
    let ticking = false;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      progressBar.style.width = `${progress}%`;

      if (backToTop) {
        backToTop.classList.toggle("show", scrollTop > 300);
      }

      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });

    updateProgress();
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
