class ContactDetailsScreen {

    firstNameField(){
        return '[data-test-id="rfq-contact__first-name"]'
    }

    lastNameField(){
        return '[data-test-id="rfq-contact__last-name"]'
    }

    emailField(){
        return '[data-test-id="rfq-contact__email"]'
    }

    phoneNrField(){
        return '[data-test-id="rfq-contact__phone"]'
    }

    postalCodeField(){
        return '[data-test-id="rfq-contact__postal-code"]'
    }

    commentField(){
        return '[data-test-id="rfq-contact__comments"]'
    }

    checkboxes(){
        return 'input[type="checkbox"]'
    }

    errorMessageField(){
        return '.dcp-error-message'
    }

    errorMessageHint(){
        return '.dcp-error-message__error-hint'
    }

    submitButton(){
        return '[data-test-id="dcp-rfq-contact-button-container__button-next"]'
    }

    enquireNowButton(){
        return 'button[data-test-id="dcp-buy-box__contact-seller"]'
    }

    fillsWithWrongInfoAndSubmit(details) {
        cy.get(this.enquireNowButton()).click()
            cy.get(this.firstNameField()).type(details.firstName)
            cy.get(this.lastNameField()).type(details.lastName)
            cy.get(this.emailField()).type(details.wrongEmail)
            cy.get(this.phoneNrField()).type(details.wrongPhone)
            cy.get(this.postalCodeField()).type(details.zip)
            cy.get(this.commentField()).type(details.comment)
            cy.get(this.checkboxes()).first().click({force:true})
            cy.get(this.submitButton()).click()
        }

    validateErrorMessage() {
         cy.get(this.errorMessageField(),{timeout:1000})
            .should('be.visible')
            .within(()=>{
                       cy.get(this.errorMessageHint())
                         .should('contain','An error has occurred.')
                         .and('contain', 'Please check the following sections:')
                   })
    }

}
export default new ContactDetailsScreen()