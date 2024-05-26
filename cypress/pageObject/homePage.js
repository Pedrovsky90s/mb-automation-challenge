class HomePage {

    cookieButtonsWrapper(){
        return 'cmm-buttons-wrapper.hydrated'
    }

    acceptAllCookiesButton(){
        return '[data-test="handle-accept-all-button"]'
    }

    locationPopupModal(){
        return '[data-test-id="modal-popup__location"]'
    }

    locationPopupModalDropdown(){
        return '.dcp-header-location-modal-dropdown'
    }

    selectLocationList(){
        return 'select'
    }

    postalCodeInput(){
        return 'wb-input'
    }

    postalInputValidationError(){
        return 'wb-control-error'
    }

    radioPurposePrivate(type){
        return `input[type="radio"][value="${type}"]`
    }

    locationPopupModalContinueButton(){
        return '[data-test-id="state-selected-modal__close"]'
    }

    blueFilter(){
        return 'span.filter-toggle'
    }

    openFilter(){
        return cy.get(this.blueFilter(), { timeout: 10000}).click()
    }

    waitScreenLoaderDisappear(wait) {
            return cy.get('.dcp-loader--hide',{timeout: wait}).should('exist')
        }

    acceptAllCookieBanner(){
                return cy.get('cmm-cookie-banner[settings-id="Kvbnw4-6_"]')
                               .shadow()
                               .find(this.cookieButtonsWrapper())
                               .should('be.visible')
                               .find(this.acceptAllCookiesButton()).click({force: true})
            }
}
export default new HomePage()