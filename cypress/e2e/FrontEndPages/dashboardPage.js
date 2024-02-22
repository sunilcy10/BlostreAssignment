const locators = {
    welcomeMsg: '[class="has-text-align-center"]',
    logoutBtn: '[class="wp-block-group"] > div > div > a',

}

class dashboard {
    validateWelcomeMsg() {
        cy.get(locators.welcomeMsg).should('have.text', 'Congratulations student. You successfully logged in!').and('be.visible')
    }

    validateLogoutBtn() {
        cy.get(locators.logoutBtn).should('be.visible')
    }

    validateNewURL() {
        cy.url().should('contains', 'logged-in-successfully')
    }
}
export default dashboard;