const menuBtn = document.getElementById("menu-btn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const links = drawer.querySelectorAll("a");
const first = links[0];
const last = links[links.length - 1];

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  first.focus();
}

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  menuBtn.focus();
}

menuBtn.addEventListener("click", () =>
  drawer.classList.contains("open") ? closeDrawer() : openDrawer(),
);

overlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
  if (!drawer.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeDrawer();
    return;
  }

  if (e.key !== "Tab") return;

  if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
});
