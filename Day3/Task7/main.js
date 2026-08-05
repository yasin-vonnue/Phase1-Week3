let board = JSON.parse(localStorage.getItem("kanban")) || {
  todo: [],
  progress: [],
  done: [],
};

function save() {
  localStorage.setItem("kanban", JSON.stringify(board));
}

function render() {
  const active = document.activeElement?.dataset?.id;

  document.querySelectorAll(".cards").forEach((c) => (c.innerHTML = ""));

  for (const column in board) {
    const container = document.querySelector(
      `[data-column="${column}"] .cards`,
    );

    if (!container) continue;

    board[column].forEach((card) => {
      const div = document.createElement("div");

      div.className = "card";
      div.draggable = true;
      div.tabIndex = 0;
      div.dataset.id = card.id;
      div.textContent = card.text;

      const del = document.createElement("button");
      del.textContent = "x";

      del.draggable = false;

      del.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });

      del.onclick = () => {
        board[column] = board[column].filter((c) => c.id !== card.id);

        save();
        render();
      };

      div.appendChild(del);

      div.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", String(card.id));
      });

      div.addEventListener("keydown", keyboardMove);

      container.appendChild(div);
    });
  }

  if (active) {
    document.querySelector(`[data-id="${active}"]`)?.focus();
  }
}

document.querySelectorAll(".column").forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  column.addEventListener("dragenter", () => {
    column.classList.add("over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("over");
  });

  column.addEventListener("drop", (e) => {
    column.classList.remove("over");

    const id = Number(e.dataTransfer.getData("text/plain"));

    let card;

    for (const c in board) {
      const i = board[c].findIndex((x) => x.id === id);

      if (i >= 0) {
        card = board[c].splice(i, 1)[0];
        break;
      }
    }

    if (!card) return;

    board[column.dataset.column].push(card);

    save();
    render();
  });
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = form.querySelector("input");

    if (!input.value.trim()) return;

    board[form.dataset.column].push({
      id: Date.now(),
      text: input.value,
    });

    input.value = "";

    save();
    render();
  });
});

let picked = null;

function keyboardMove(e) {
  const id = Number(e.target.dataset.id);

  if (e.code === "Space") {
    e.preventDefault();

    if (picked === null) {
      picked = id;
      e.target.classList.add("picked");
    } else {
      picked = null;
      e.target.classList.remove("picked");
    }

    return;
  }

  if (picked === null) return;

  const cols = ["todo", "progress", "done"];

  const from = cols.find((column) =>
    board[column].some((card) => card.id === picked),
  );

  const index = cols.indexOf(from);

  if (e.key === "ArrowRight" && index < 2) {
    move(picked, cols[index + 1]);
    picked = null;
  }

  if (e.key === "ArrowLeft" && index > 0) {
    move(picked, cols[index - 1]);
    picked = null;
  }
}

function move(id, to) {
  for (const c in board) {
    const i = board[c].findIndex((x) => x.id === id);

    if (i >= 0) {
      const card = board[c].splice(i, 1)[0];

      board[to].push(card);

      save();

      render();

      return;
    }
  }
}

render();
