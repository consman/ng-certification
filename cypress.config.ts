import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'rj979m',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"http://localhost:4200",
    projectId:"rj979m"
  },
});
