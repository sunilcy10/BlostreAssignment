import login from "../e2e/FrontEndPages/loginPage";
import dashboard from "../e2e/FrontEndPages/dashboardPage";

const loginPage = new login()
const dashboardPage = new dashboard()

describe('login functionality check', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Valid Username Password', () => {
        cy.fixture('loginData.json').then(data => {
            loginPage.login(data.username, data.password)
            dashboardPage.validateWelcomeMsg()
            dashboardPage.validateLogoutBtn()
            dashboardPage.validateNewURL()
        })
    })
    it('Invalid username', () => {
        cy.fixture('loginData.json').then(data => {
            loginPage.login(data.invalidUsername, data.password)
            loginPage.validateWrongUsernameErrorMsg()
        })
    })
    it('Invalid password', () => {
        cy.fixture('loginData.json').then(data => {
            loginPage.login(data.username, data.invalidPassword)
            loginPage.validateWrongPasswordErrorMsg()
        })
    })
})