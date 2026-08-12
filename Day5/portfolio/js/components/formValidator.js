import { showToast } from "../utils.js";

export class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;

    this.attachEvents();
  }

  attachEvents() {
    Object.keys(this.rules).forEach((fieldName) => {
      const field = this.form.elements[fieldName];

      if (!field) {
        return;
      }

      field.addEventListener("blur", () => {
        this.validateField(fieldName);
      });

      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) {
          this.validateField(fieldName);
        }
      });
    });

    this.form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const isValid = this.validateForm();

      if (!isValid) {
        return;
      }

      await this.handleSubmit();
    });
  }

  validateForm() {
    let valid = true;

    Object.keys(this.rules).forEach((fieldName) => {
      if (!this.validateField(fieldName)) {
        valid = false;
      }
    });

    return valid;
  }

  validateField(fieldName) {
    const field = this.form.elements[fieldName];

    if (!field) {
      return true;
    }

    const value = field.value.trim();
    const rules = this.rules[fieldName];

    let error = "";

    for (const rule of rules) {
      switch (rule.type) {
        case "required":
          if (value === "") {
            error = rule.message || "This field is required.";
          }
          break;

        case "minLength":
          if (value !== "" && value.length < rule.value) {
            error =
              rule.message || `Minimum ${rule.value} characters required.`;
          }
          break;

        case "pattern":
          if (value !== "" && !rule.value.test(value)) {
            error = rule.message || "Invalid format.";
          }
          break;

        case "email":
          if (value !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = rule.message || "Invalid email address.";
          }
          break;
      }

      if (error) {
        break;
      }
    }

    this.showError(field, error);

    return error === "";
  }

  showError(field, message) {
    const errorSpan = this.form.querySelector(`#${field.id}-error`);

    if (!errorSpan) {
      return;
    }

    errorSpan.textContent = message;

    field.classList.remove("is-valid", "is-invalid");

    if (message) {
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
    } else {
      field.classList.add("is-valid");
      field.setAttribute("aria-invalid", "false");
    }
  }

  async handleSubmit() {
    const submitButton = this.form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      submitButton.classList.add("is-loading");
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    this.form.reset();

    Object.keys(this.rules).forEach((fieldName) => {
      const field = this.form.elements[fieldName];

      if (field) {
        field.classList.remove("is-valid", "is-invalid");
        field.removeAttribute("aria-invalid");
      }

      const errorSpan = this.form.querySelector(`#${fieldName}-error`);

      if (errorSpan) {
        errorSpan.textContent = "";
      }
    });

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
      submitButton.classList.remove("is-loading");
    }

    showToast("Your message has been submitted successfully.");
  }
}

export function setupContactFormValidation() {
  const form = document.getElementById("contact-form");

  if (!form) {
    return;
  }

  new FormValidator(form, {
    name: [
      {
        type: "required",
        message: "Name is required.",
      },
      {
        type: "minLength",
        value: 2,
        message: "Name must contain at least 2 characters.",
      },
    ],

    email: [
      {
        type: "required",
        message: "Email is required.",
      },
      {
        type: "email",
        message: "Please enter a valid email address.",
      },
    ],

    phone: [
      {
        type: "pattern",
        value: /^[0-9]{10}$/,
        message: "Phone must contain exactly 10 digits.",
      },
    ],

    message: [
      {
        type: "required",
        message: "Message is required.",
      },
      {
        type: "minLength",
        value: 20,
        message: "Message must contain at least 20 characters.",
      },
    ],
  });
}
