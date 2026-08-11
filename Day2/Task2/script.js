const list = document.getElementById("list");
const input = document.getElementById("input");

document.body.addEventListener("click", (e) => {
  if (e.target.id === "add") {
    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox">
      <span class="text">${input.value}</span>
      <button class="delete">Delete</button>
    `;

    list.appendChild(li);
    input.value = "";
    return;
  }

  if (!e.target.closest("#list")) return;

  const item = e.target.closest("li");

  if (e.target.closest("input[type=checkbox]")) {
    item.classList.toggle("done");
  }

  if (e.target.closest(".delete")) {
    item.remove();
  }

  if (e.target.closest(".text")) {
    const text = e.target.closest(".text");
    text.contentEditable = true;
    text.focus();
  }
});
