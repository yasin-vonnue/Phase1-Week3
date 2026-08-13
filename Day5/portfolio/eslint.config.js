import js from "@eslint/js";

export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        IntersectionObserver: "readonly",
        fetch: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
  },

  js.configs.recommended,
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
  },
];
