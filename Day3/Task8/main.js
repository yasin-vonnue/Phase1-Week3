document.querySelectorAll("article").forEach((article) => {
  const articleId = article.id;

  let comments =
    JSON.parse(localStorage.getItem(articleId + "_comments")) || [];

  let voted = JSON.parse(localStorage.getItem(articleId + "_voted")) || [];

  function save() {
    localStorage.setItem(articleId + "_comments", JSON.stringify(comments));

    localStorage.setItem(articleId + "_voted", JSON.stringify(voted));
  }

  function createComment(name, text) {
    return {
      id: Date.now(),
      name,
      text,
      votes: 0,
      replies: [],
    };
  }

  const form = article.querySelector(".commentForm");
  const nameInput = article.querySelector(".name");
  const textInput = article.querySelector(".text");
  const container = article.querySelector(".comments");
  const clearButton = article.querySelector(".clear");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    comments.unshift(createComment(nameInput.value, textInput.value));

    save();
    render();

    form.reset();
  });

  function render() {
    container.innerHTML = "";

    comments.forEach((comment) => {
      container.appendChild(renderComment(comment));
    });
  }

  function renderComment(comment) {
    const div = document.createElement("div");

    div.className = "comment";

    const user = document.createElement("strong");
    user.textContent = comment.name;

    const text = document.createElement("p");
    text.textContent = comment.text;

    const vote = document.createElement("button");
    vote.textContent = "\u25B2 " + comment.votes;

    vote.onclick = () => {
      if (voted.includes(comment.id)) return;

      comment.votes++;

      voted.push(comment.id);

      save();
      render();
    };

    const reply = document.createElement("button");

    reply.textContent = "Reply";

    reply.onclick = () => {
      showReplyForm(div, comment);
    };

    div.append(user, text, vote, reply);

    const replies = document.createElement("div");

    replies.className = "replies";

    comment.replies.forEach((child) => {
      replies.appendChild(renderComment(child));
    });

    div.appendChild(replies);

    return div;
  }

  function showReplyForm(parent, comment) {
    if (parent.querySelector(".reply-form")) return;

    const form = document.createElement("form");

    form.className = "reply-form";

    const input = document.createElement("input");

    input.placeholder = "Your name";

    const textarea = document.createElement("textarea");

    textarea.placeholder = "Reply";

    const button = document.createElement("button");

    button.textContent = "Send";

    form.append(input, textarea, button);

    form.onsubmit = (e) => {
      e.preventDefault();

      if (!input.value.trim() || !textarea.value.trim()) return;

      comment.replies.unshift(createComment(input.value, textarea.value));

      save();
      render();
    };

    parent.appendChild(form);
  }

  clearButton.onclick = () => {
    comments = [];
    voted = [];

    localStorage.removeItem(articleId + "_comments");
    localStorage.removeItem(articleId + "_voted");

    render();
  };

  render();
});
