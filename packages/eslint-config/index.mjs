/** @type {import('eslint').Linter.Config[]} */
const baseConfig = [
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
    },
  },
];

export default baseConfig;
