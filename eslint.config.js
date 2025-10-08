import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["src/**/*.{ts,tsx,js}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": "error",
    }
  }
];
