const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  extends: ["next/core-web-vitals"],
  rules: {
    'no-undef': "warn",
    "no-unused-vars": 'warn'
  },
};

module.exports = config;
