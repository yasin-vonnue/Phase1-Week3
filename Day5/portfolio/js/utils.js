export function debounce(callback, delay = 300) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function showToast(message) {
  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  document.body.append(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
