class FiltersPage {

    selectPreOwned() {
         cy.get('wb-tab-bar.hydrated').within(()=> {
                cy.get('button')
                    .contains(" Pre-Owned")
                    .should('be.visible')
                    .click()
        })
    }

    openColourFilter() {
         cy.get('.category-filter-row-headline__text')
            .contains("Colour")
            .scrollIntoView()
            .should('be.visible')
            .click()
            .then(()=>{
                cy.get('[data-test-id="multi-select-dropdown-card-opener"]')
                            .contains("Colour")
                            .click()
            })
    }

    selectColour(colour){
        cy.get('ul.dcp-multi-select-dropdown-card--expanded')
            .contains(colour)
            .should('be.visible')
            .click()
    }

    closeFilter(){
           return cy.get('span.close-button.show').click()
    }
}
export default new FiltersPage()