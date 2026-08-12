export function setupAccordion() {
  const accordion = document.querySelector(".faq");

  if (!accordion) {
    return;
  }

  const buttons = accordion.querySelectorAll(".faq-question");

  function closeAll() {
    buttons.forEach((button) => {
      const answer = document.getElementById(
        button.getAttribute("aria-controls"),
      );

      button.setAttribute("aria-expanded", "false");

      if (answer) {
        answer.hidden = true;
      }
    });
  }

  function toggleItem(button) {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const answer = document.getElementById(
      button.getAttribute("aria-controls"),
    );

    closeAll();

    if (!isExpanded) {
      button.setAttribute("aria-expanded", "true");

      if (answer) {
        answer.hidden = false;
      }
    }
  }

  function handleKeydown(event, index) {
    let nextIndex = index;

    if (event.key === "ArrowDown") {
      nextIndex = (index + 1) % buttons.length;
    }

    if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + buttons.length) % buttons.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = buttons.length - 1;
    }

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Home" ||
      event.key === "End"
    ) {
      event.preventDefault();
      buttons[nextIndex].focus();
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      toggleItem(button);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleItem(button);
        return;
      }

      handleKeydown(event, index);
    });
  });
}
