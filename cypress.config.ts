import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'vvf2ts',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
