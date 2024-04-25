import { defineConfig } from "vitest/config";
// jsdom like to emulate the server to test
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.js",
  },
});
