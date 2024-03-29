/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-localstorage-commands/plugin')(on, config);
      return config;
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/',
  },
});
