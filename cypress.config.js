const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 't35o7y',
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/',
    experimentalStudio: true,
    setupNodeEvents(on, config) {
              require("cypress-localstorage-commands/plugin")(on, config);
              return config;
            },
  },
});