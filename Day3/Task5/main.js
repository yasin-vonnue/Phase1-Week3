class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;

    this.attachEvents();
  }

  attachEvents() {
    Object.keys(this.rules).forEach((fieldName) => {
      const field = this.form.elements[fieldName];

      if (!field) return;

      field.addEventListener("blur", () => {
        this.validateField(fieldName);
      });
    });

    this.form.addEventListener("submit", (e) => {
      let valid = true;

      Object.keys(this.rules).forEach((field) => {
        if (!this.validateField(field)) {
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  validateField(fieldName) {
    const field = this.form.elements[fieldName];
    const value =
      field.type === "file" ? field.files.length : field.value.trim();

    const rules = this.rules[fieldName];

    let error = "";

    for (const rule of rules) {
      switch (rule.type) {
        case "required":
          if (
            (field.type === "file" && field.files.length === 0) ||
            value === ""
          ) {
            error = rule.message || "This field is required.";
          }
          break;

        case "minLength":
          if (value.length < rule.value) {
            error =
              rule.message || `Minimum ${rule.value} characters required.`;
          }
          break;

        case "maxlength":
          if (value.length > rule.value) {
            error = rule.message || `Maximum ${rule} characters allowed.`;
          }
          break;

        case "pattern":
          if (value && !rule.value.test(value)) {
            error = rule.message || "Invalid format.";
          }
          break;

        case "email":
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = rule.message || "Invalid email address.";
          }
          break;

        case "match":
          if (value !== this.form.elements[rule.field].value) {
            error = rule.message || "Values do not match.";
          }
          break;

        case "custom":
          if (!rule.validate(value, field, this.form)) {
            error = rule.message || "Invalid value.";
          }
          break;
      }

      if (error) break;
    }

    this.showError(field, error);

    return error === "";
  }

  showError(field, message) {
    let span = field.parentNode.querySelector(".field-error");

    if (!span) {
      span = document.createElement("span");
      span.className = "field-error";
      field.parentNode.appendChild(span);
    }

    span.textContent = message;

    field.classList.remove("is-valid", "is-invalid");

    if (message) {
      field.classList.add("is-invalid");
    } else {
      field.classList.add("is-valid");
    }
  }
}

const form = document.getElementById("registrationForm");

new FormValidator(form, {
  name: [{ type: "required" }, { type: "minLength", value: 3 }],

  email: [{ type: "required" }, { type: "email" }],

  phone: [
    { type: "required" },
    {
      type: "pattern",
      value: /^[0-9]{10}$/,
      message: "Phone must contain exactly 10 digits.",
    },
  ],

  age: [
    { type: "required" },
    {
      type: "custom",
      validate: (value) => Number(value) >= 18,
      message: "Age must be at least 18.",
    },
  ],

  github: [
    { type: "required" },
    {
      type: "pattern",
      value: /^https?:\/\/.+/,
      message: "Enter a valid URL.",
    },
  ],

  username: [
    { type: "required" },
    {
      type: "pattern",
      value: /^[A-Za-z0-9_]{3,20}$/,
    },
  ],

  pwd: [
    { type: "required" },
    { type: "minLength", value: 5 },
    { type: "maxLength", value: 18 },
  ],

  confirmpwd: [
    { type: "required" },
    {
      type: "match",
      field: "pwd",
      message: "Passwords do not match.",
    },
  ],

  myfile: [{ type: "required" }],

  "job-title": [{ type: "required" }],
});
