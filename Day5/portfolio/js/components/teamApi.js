import { fetchJSON } from "../utils.js";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export function setupTeamAPI() {
  const grid = document.querySelector("#team-grid");
  const departmentSelect = document.querySelector("#team-department");
  const status = document.querySelector("#team-status");

  if (!grid || !departmentSelect || !status) {
    return;
  }

  let members = [];

  const departments = ["Design", "Backend", "Frontend", "QA", "DevOps"];

  function showSkeletons() {
    grid.innerHTML = Array.from(
      { length: 6 },
      () => `
        <article class="team-card api-skeleton">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
        </article>
      `,
    ).join("");
  }

  function getDepartment(user) {
    return departments[(user.id - 1) % departments.length];
  }

  function renderDepartments() {
    departmentSelect.innerHTML = `
      <option value="all">All Departments</option>

      ${departments
        .map(
          (department) => `
            <option value="${department}">
              ${department}
            </option>
          `,
        )
        .join("")}
    `;
  }

  function renderTeam() {
    const selectedDepartment = departmentSelect.value;

    const filteredMembers = members.filter(
      (member) =>
        selectedDepartment === "all" ||
        member.department === selectedDepartment,
    );

    if (!filteredMembers.length) {
      grid.innerHTML = `
        <p class="no-results">
          No team members found.
        </p>
      `;
      return;
    }

    grid.innerHTML = filteredMembers
      .map(
        (member) => `
          <article class="team-card scroll-animate">
            <img
              src="https://i.pravatar.cc/300?u=${member.id}"
              alt="Portrait of ${member.name}"
              loading="lazy"
            />

            <div>
              <h3>${member.name}</h3>

              <p>
                <strong>${member.department}</strong>
              </p>

              <p>${member.email}</p>

              <p>${member.phone}</p>

              <a
                href="https://${member.website}"
                target="_blank"
                rel="noopener noreferrer"
              >
                ${member.website}
              </a>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function showError() {
    status.innerHTML = `
      <div class="api-error">
        <p>Unable to load team members.</p>

        <button type="button" id="team-retry">
          Retry
        </button>
      </div>
    `;

    document.querySelector("#team-retry")?.addEventListener("click", loadTeam);
  }

  async function loadTeam() {
    status.textContent = "Loading team...";
    showSkeletons();

    try {
      const users = await fetchJSON(API_URL);

      members = users.map((user) => ({
        ...user,
        department: getDepartment(user),
      }));

      renderDepartments();
      renderTeam();

      status.textContent = "";
    } catch (error) {
      console.error("Failed to load team members:", error);

      grid.innerHTML = "";
      showError();
    }
  }

  departmentSelect.addEventListener("change", renderTeam);

  loadTeam();
}
