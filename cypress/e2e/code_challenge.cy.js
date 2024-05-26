const details = require('../fixtures/contactDetails');
const homePage = require ('../pageObject/HomePage')
const filterPage = require('../pageObject/FiltersPage')
const contactDetailsScreen= require('../pageObject/contactDetailsScreen')

describe('Validate the negative path of enquiring the highest price at Mercedes-Benz', () => {

  beforeEach(() => {
   Cypress.on('uncaught:exception', (err, runnable) => {return false}) //Turn off uncaught exceptions that will fail the running tests due to application handling missing something
   cy.visitWithRetry('/demo') // Visits the demo page, if status code or network fails, it repeats
   homePage.waitScreenLoaderDisappear(20000) //Wait for the screen loader to disappear from screen
   homePage.acceptAllCookieBanner().click({force: true}) //Accepts all cookies to continue
   })

  it('Filters for a particular car, selects the most expensive and fills Contact with wrong info', () => {

    cy.get(homePage.locationPopupModalDropdown()).should('exist') //Validates if the locationPopup Module is shown

    cy.fillLocationPopup('New South Wales', '20', '07', 'P') //Fills location Popup fields with specific information

    cy.get(homePage.openFilter()) //After reaching the Homepage it will open the filter

    filterPage.selectPreOwned() //Selects Pre-Owned tab within filter

    cy.url().should('eq',`${Cypress.config('baseUrl')}used`) //Validates that user landed on correct page

    homePage.waitScreenLoaderDisappear(10000) //Waits for Screen loader to disappear before interacting with the page

    cy.get(homePage.openFilter()) //Since I'm using the regular window size from cypress there is a need to re-open filter

    filterPage.openColourFilter() //Chooses colour Filter

    filterPage.selectColour(" BRILLANTBLUE metallic ") //Chooses preferred colour

    filterPage.closeFilter() //Closes Filter screen

    cy.findMostExpensiveCar() //Queries the page finding the most expensive car card and clicks on the card

    cy.saveCarInfo() //Saves Model Year and Vin number of the car to carDetails.json

    contactDetailsScreen.fillsWithWrongInfoAndSubmit(details) //Opens Contact Details and fills form with wrong user details

    contactDetailsScreen.validateErrorMessage() //Validates error is shown when trying to submit form with bad info
  })
})