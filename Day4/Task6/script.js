const form = document.querySelector("#github-form");
const usernameInput = document.querySelector("#username");

const loading = document.querySelector("#loading");
const error = document.querySelector("#error");

const profile = document.querySelector("#profile");
const repositories = document.querySelector("#repositories");
const repoList = document.querySelector("#repo-list");

const avatar = document.querySelector("#avatar");
const name = document.querySelector("#name");
const bio = document.querySelector("#bio");
const locationElement = document.querySelector("#location");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

let controller = null;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (!username) {
    return;
  }

  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  error.hidden = true;
  profile.hidden = true;
  repositories.hidden = true;
  repoList.innerHTML = "";

  loading.hidden = false;

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      {
        signal: controller.signal,
      },
    );

    if (userResponse.status === 404) {
      throw new Error("Github user not found.");
    }

    if (userResponse.status === 403 || userResponse.status === 429) {
      throw new Error("Github API rate limit reached. Please try again later.");
    }

    if (!userResponse.ok) {
      throw new Error("Unable to fetch Github profile. Please try again.");
    }

    const user = await userResponse.json();

    const repoResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`,
      {
        signal: controller.signal,
      },
    );

    if (repoResponse.status === 403 || repoResponse.status === 429) {
      throw new Error("Github API rate limit reached. Please try again later.");
    }

    if (!repoResponse.ok) {
      throw new Error("Unable to fetch Github repositories.");
    }

    const repos = await repoResponse.json();

    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    avatar.src = user.avatar_url;
    avatar.alt = `${user.login}'s Github avatar`;

    name.textContent = user.name || user.login;

    bio.textContent = user.bio || "No bio available.";

    locationElement.textContent = user.location || "Not available";

    followers.textContent = user.followers;
    following.textContent = user.following;

    profile.hidden = false;

    topRepos.forEach((repo) => {
      const card = document.createElement("article");
      card.classList.add("repo-card");

      const repoName = document.createElement("h3");
      repoName.textContent = repo.name;

      const description = document.createElement("p");
      description.classList.add("repo-description");

      description.textContent = repo.description || "No description available.";

      const details = document.createElement("div");
      details.classList.add("repo-details");

      const language = document.createElement("span");
      language.classList.add("language-badge");

      language.textContent = repo.language || "Unknown";

      const stars = document.createElement("span");
      stars.classList.add("star-count");

      stars.textContent = `★ ${repo.stargazers_count}`;

      details.append(language, stars);

      card.append(repoName, description, details);

      repoList.append(card);
    });

    repositories.hidden = false;
  } catch (err) {
    if (err.name === "AbortError") {
      return;
    }

    error.textContent = err.message;
    error.hidden = false;
  } finally {
    loading.hidden = true;
  }
});
