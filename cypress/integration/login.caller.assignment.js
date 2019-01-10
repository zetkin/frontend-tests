import 'cypress-testing-library/add-commands';

let user;
context('Login', () => {
    beforeEach(() => {
        cy.on('window:confirm', () => false);
        cy.fixture('users/caller')
        .as('user')
        .then(userCaller => {
            user = userCaller
        });
    });

    it('can be accessed from the home page', () => {
                cy.visit('https://www.dev.zetkin.org/')
                    .getByText('Log in')
                    .click()
                    .get('input[type=email]')
                    .type(user.email)
                    .get('input[type=password]')
                    .type(user.password)
                    .get('input[type=submit]')
                    .click()
                    .url()
                    .should('contain', '/dashboard');
            });
    });
