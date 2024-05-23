// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe';

    Cypress.Commands.add('setLocalStorage', (key, value) => {
  cy.window().then((win) => {
    win.localStorage.setItem(key, value);
  });
});

Cypress.Commands.add(`visitWithRetry`, (url) => {
    cy.request(url);
    cy.visit(url, {
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true,
    });
});

Cypress.Commands.add('findCheapestMoisturizerWith', (name) =>{
  cy.get(`button[onclick]`).then($moisturizer => {
        let cheapestPrice = Number.MAX_VALUE
        let cheapestIndex = -1

        $moisturizer.each((index, $moisturizer) =>{
            const onClickAttribute = $moisturizer.getAttribute('onclick')
            const regex = new RegExp(name, 'i')

            if (regex.test(onClickAttribute)) {
                const price = parseInt(onClickAttribute.match(/\d+/)[0])

                if (price<cheapestPrice) {
                    cheapestPrice = price
                    cheapestIndex = index
                }
            }
        })
        if (cheapestIndex !== -1) {
            cy.wrap($moisturizer[cheapestIndex]).click()
        }
    })
})