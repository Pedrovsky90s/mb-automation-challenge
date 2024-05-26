const homePage = require ('../pageObject/homePage');
const details = require('../fixtures/contactDetails');


Cypress.Commands.add('fillLocationPopup', (location, postalCodePart1, postalCodePart2, type) => {
  cy.get(homePage.locationPopupModal()).within(()=> {
          cy.get('select').select(location, {force:true}) //TODO: Validate possibility of removing all force:true on project

          cy.get(homePage.postalCodeInput()).type(postalCodePart1)
          cy.get(homePage.postalInputValidationError())
              .should('be.visible')
              .and('have.text',' Please enter a valid Postal Code. ')
              .then(($error)=> {
                  if (!$error.is(':visible'))  {
                      throw new Error ('Field input validation is not visible!') //Throws an error in case the input validation is not visible
                  }
              });
          cy.get(homePage.postalCodeInput()).type(postalCodePart2)

          cy.get(homePage.radioPurposePrivate(type)).check({force:true})
          cy.get(homePage.locationPopupModalContinueButton()).click({force: true})
    })
  })

Cypress.Commands.add('saveCarInfo', () => {
   const carDetails = {} //Creates a constant variable that houses an empty object to contain carDetails Model year and Vin
              cy.get('[data-test-id="dcp-vehicle-details-list-item-3"]').should('contain', 'Model Year ') //Gets element and validates it has Text "Model Year"
              cy.get('[data-test-id="dcp-vehicle-details-list-item-3"] .dcp-vehicle-details-list-item__value') //drills into the child element that has the year text
                      .invoke('text')
                      .then((year) => {
                          carDetails.year = year.trim() //removes whitespaces and adds to carDetails

                          cy.get('[data-test-id="dcp-vehicle-details-list-item-11"]').should('contain', 'VIN ') //Gets element and validates Text is "VIN"
                          cy.get('[data-test-id="dcp-vehicle-details-list-item-11"] .dcp-vehicle-details-list-item__value')
                                              .invoke('text')
                                              .then((vin) => {
                                                  carDetails.vin = vin.trim() //removes whitespaces and adds to the carDetails

                                                  cy.writeFile('cypress/fixtures/carDetails.json', carDetails).then(()=>{ //Creates or Updates carDetails.Json with carDetails info inside
                                                      cy.log('File written successfully')
                                                  })
                                              })
                      })
})

Cypress.Commands.add('findMostExpensiveCar', () => {

    let highestPrice = -1
    let highestPriceElement

    cy.get('[data-test-id="dcp-cars-product-tile-price"]').each(($el) => {

        //wraps raw Dom element in order to use Cypress command

            cy.wrap($el).invoke('text').then((text)=> {
                //trim whitespaces
                const priceString= text.trim()
                console.log({text, priceString})

                //extract number from string
                const getTheNumberString = priceString.split('$')[1].replace(/,/g,'');
                console.log({getTheNumberString})

                //Convert string to Integer
                const price = parseInt(getTheNumberString, 10);
                console.log({price})

                //Compares prices
                if (price > highestPrice) {
                    highestPrice = price;
                    highestPriceElement = $el
                }
            })

        }).then(() => {
             console.log({highestPrice});
             cy.get(highestPriceElement).click();
         });
    });

Cypress.Commands.add('visitWithRetry', (url) => {
    cy.request(url)
    cy.visit(url, {
        retryOnStatusCodeFailure: true,
        retryOnNetworkFailure: true,
    });
});