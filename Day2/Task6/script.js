const buttons = document.querySelectorAll(".accordion-btn");
const panels = document.querySelectorAll(".content");

const STORAGE_KEY = "openAccordion";

function closeAll() {
  buttons.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
  });

  panels.forEach((panel) => {
    panel.hidden = true;
    panel.classList.remove("open");
  });
}

function openPanel(index) {
  closeAll();

  buttons[index].setAttribute("aria-expanded", "true");

  panels[index].hidden = false;
  panels[index].classList.add("open");

  sessionStorage.setItem(STORAGE_KEY, index);
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closeAll();
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      openPanel(index);
    }
  });

  button.addEventListener("keydown", (e) => {
    let next;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        next = (index + 1) % buttons.length;
        buttons[next].focus();
        break;

      case "ArrowUp":
        e.preventDefault();
        next = (index - 1 + buttons.length) % buttons.length;
        buttons[next].focus();
        break;

      case "Home":
        e.preventDefault();
        buttons[0].focus();
        break;

      case "End":
        e.preventDefault();
        buttons[buttons.length - 1].focus();
        break;

      case "Enter":
      case " ":
      case "Spacebar":
        e.preventDefault();
        button.click();
        break;
    }
  });
});

const saved = sessionStorage.getItem(STORAGE_KEY);

if (saved !== null && buttons[saved]) {
  openPanel(Number(saved));
}
