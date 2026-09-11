import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    fileParallelism: false,
    globals: true,
    maxWorkers: 1,
    pool: "forks",
    setupFiles: ["./src/test/setup.ts"],
  },
});
