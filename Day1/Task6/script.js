const projnum = document.getElementById("project1");

console.log(projnum);

const proj = document.getElementsByClassName("project");

console.log(proj);

const tagH1 = document.getElementsByTagName("H1");

console.log(tagH1);

const featuredProj = document.querySelector(".featured");

console.log(featuredProj);

const allParagraphs = document.querySelectorAll("p");

console.log(allParagraphs);

const target = document.getElementById("project2");
console.log("Baseline Element: ", target);

const parent = target.parentElement;
console.log("Parent Element: ", parent);

const firstChild = parent.firstElementChild;
console.log("First Child: ", firstChild);

const lastChild = parent.lastElementChild;
console.log("Last Child: ", lastChild);

const nextSibling = target.nextElementSibling;
console.log("Next Sibling: ", nextSibling);

function addCard(title, body, imageUrl) {
  const portfolioContainer = document.querySelector(".portfolio");
  if (!portfolioContainer) return;

  const projectDiv = document.createElement("div");
  projectDiv.className = "project";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;

  const contentDiv = document.createElement("div");
  contentDiv.className = "content";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = body;

  contentDiv.appendChild(heading);
  contentDiv.appendChild(paragraph);

  const overlayDiv = document.createElement("div");
  overlayDiv.className = "overlay";

  const overlayHeading = document.createElement("h2");
  overlayHeading.textContent = title;

  const githubLink = document.createElement("a");
  githubLink.href = "#";
  githubLink.textContent = "Github";

  const demoLink = document.createElement("a");
  demoLink.href = "#";
  demoLink.textContent = "Live Demo";

  overlayDiv.appendChild(overlayHeading);
  overlayDiv.appendChild(githubLink);
  overlayDiv.appendChild(demoLink);

  projectDiv.appendChild(img);
  projectDiv.appendChild(contentDiv);
  projectDiv.appendChild(overlayDiv);

  portfolioContainer.appendChild(projectDiv);
}

addCard(
  "E-Commerce Platform",
  "A robust online shopping application built safely from user inputs.",
  "https://picsum.photos/id/23/200/300",
);

function removeCard(id) {
  const card = document.getElementById(id);
  if (card) card.remove();
}

function clearAllCards() {
  const container = document.querySelector(".portfolio");
  if (container) container.textContent = "";
}

addCard(
  "Temporary Project",
  "To be deleted",
  "https://picsum.photos/id/53/200/300",
);

document.querySelector(".portfolio").lastElementChild.id = "temp-project";

removeCard("temp-project");
