import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    ".next-build/**",
    ".next-old/**",
    ".next-build-old/**",
    "node_modules/**",
    "coverage/**",
  ]),
]);
