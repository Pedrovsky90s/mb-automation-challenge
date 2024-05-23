const credentials = require('../fixtures/credentials');

describe('Automation for Mercedes shop in Australia', () => {
  beforeEach(() => {
   cy.visit('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo')
   cy.get('.dcp-loader--hide',{timeout: 10000}).should('exist')
   cy.get('cmm-cookie-banner[settings-id="Kvbnw4-6_"]')
        .shadow()
        .find('cmm-buttons-wrapper.hydrated')
        .find('[data-test="handle-accept-all-button"]').click({force: true})

// Another method to circumvent accepting cookies that worked
  // cy.wait(5000);
  // cy.window().then((win) => {
  //       win.localStorage.setItem('uc_user_interaction', 'true')
  //     });
  // cy.reload();
   })

  it('Visits and fills information on my location', () => {

    cy.get('.dcp-header-location-modal-dropdown').should('exist')

    cy.get('[data-test-id="modal-popup__location"]').within(()=> {
        cy.get('select').select('New South Wales')
        cy.get('wb-input').type('20')
        cy.get('wb-control-error')
            .should('be.visible')
            .and('have.text',' Please enter a valid Postal Code. ')
            .then(($error)=> {
                if (!$error.is(':visible'))  {
                    throw new Error ('Field input validation is not visible!')
                }
            })
        cy.get('wb-input').type('07')
        cy.get('input[type="radio"][value="P"]').check({force:true})
        cy.get('[data-test-id="state-selected-modal__close"]').click()

cy.wait(5000)
        cy.get('[data-test-id="srp"]', { timeout: 10000})
        //cy.get('div.sidebar.sticky-bar-active').contains('svg[class="show"]').click({force: true})
        //cy.get('.wrapper').within(()=> {
        //cy.get('span.filter-toggle').should('exist')
        //})
    })

    //cy.get('wb-radio-control__indicator').contains("Private").check({force:true})
    /*cy.get('#temperature').then($element => {
      const temperature = parseInt($element.text().trim())

      if (temperature < 20) {
        cy.get(':nth-child(1) > a > .btn').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/moisturizer')
      }

      else {
        cy.get('.offset-4 > a > .btn').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/sunscreen')
      }
    })
  })

  it.only('Adds cheapest Aloe moisturizer to basket and then adds cheapest Almond to the basket', () => {

    cy.visitWithRetry('/moisturizer',{failOnStatusCode: false})

    cy.findCheapestMoisturizerWith('Aloe')
    cy.findCheapestMoisturizerWith('Almond')

    cy.get('#cart').click();

    cy.get('tbody')
        .should('have.length',1)

    cy.get('.stripe-button-el').click()

    getIframeBody().find('#email').type(credentials.email, { force: true })
    getIframeBody().find('#card_number').type(credentials.cardNumber, { force: true })
    getIframeBody().find('#cc-exp').type(credentials.expDate, { force: true })
    getIframeBody().find('#cc-csc').type(credentials.CVC, { force: true })
    getIframeBody().find('#billing-zip').type(credentials.Zip, { force: true })

    getIframeBody().find('#submitButton').click()

    cy.get('h2').should('have.text', 'PAYMENT SUCCESS')
          .and('be.visible')



    /*cy.iframe().then(($iframe) => {
      const body = $iframe.contents().find('body')
      cy.wrap(body).find('#email').type('4242424242424242'); // Card number

      iframe.find('#cc-csc').type("123")
      iframe.find('#cc-exp').type("1292")
    })
    cy.get('#email').type("FakeEmail@cypress.com")
    cy.get('#cc-csc').type("123")
    cy.get('#cc-exp').type("1292")*/

  });
})

const getIframeDocument = () => {
      return cy
      .get('iframe[name="stripe_checkout_app"]')
      .its('0.contentDocument').should('exist')
    }

const getIframeBody = () => {
      return getIframeDocument()
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
    }