const locators = {
    username: "#username",
    password: "#password",
    signInBtn: "#submit",
    errorMsg: "#error"
}

class loginPage {
    login(username, password) {
        cy.get(locators.username).type(username)
        cy.get(locators.password).type(password)
        cy.get(locators.signInBtn).click()
    }
    validateWrongUsernameErrorMsg() {
        cy.get(locators.errorMsg).should('have.text', 'Your username is invalid!').and('be.visible')
    }
    validateWrongPasswordErrorMsg() {
        cy.get(locators.errorMsg).should('have.text', 'Your password is invalid!').and('be.visible')
    }

}

export default loginPage;