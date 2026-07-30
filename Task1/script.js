const outer = document.getElementById("outer");
const middle = document.getElementById("middle");
const child = document.getElementById("child");

function log(phase, element) {
  console.log(`${phase}: ${element}`);
}

outer.addEventListener("click", () => log("Capture", "Outer"), true);
middle.addEventListener("click", () => log("Capture", "Middle"), true);
child.addEventListener("click", () => log("Capture", "Child"), true);

outer.addEventListener("click", () => log("Bubble", "Outer"));
middle.addEventListener("click", () => log("Bubble", "Middle"));
// child.addEventListener("click", () => log("Bubble", "Child"));

child.addEventListener("click", (e) => {
  console.log("Bubble: Child");
  e.stopPropagation();
});

middle.addEventListener("click", (e) => {
  console.log("Middle Listener 1");
  e.stopImmediatePropagation();
});

middle.addEventListener("click", () => {
  console.log("Middle Listener 2");
});

const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submission prevented");
});

const link = document.getElementById("myLink");

link.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Navigation prevented");
});
