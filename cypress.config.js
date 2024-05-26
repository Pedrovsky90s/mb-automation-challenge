const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'a95rkj',
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