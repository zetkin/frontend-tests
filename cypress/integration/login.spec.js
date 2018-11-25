import 'cypress-testing-library/add-commands';

context('Login', () => {
    beforeEach(() => {
        cy.on('window:confirm', () => false);
    });
     it('doubleclicks', () => {
        cy.visit('https://www.dev.zetkin.org/')
        cy.get('Button Header-loginButton').dblclick()  
           
    });

    it('can be achieved from home page', () => {
        cy.fixture('users/admin')
            .as('user')
            .then(user => {
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

    it('works on mobile', () => {
        cy.fixture('users/admin')
            .as('user')
            .then(user => {
                cy.viewport('iphone-6')
                    .visit('https://www.dev.zetkin.org/')
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

    it('shows error when missing email', () => {
        cy.fixture('users/admin')
            .as('user')
            .then(user => {
                cy.visit('https://www.dev.zetkin.org/')
                    .getByText('Log in')
                    .click()
                    .get('input[type=password]')
                    .type(user.password)
                    .get('input[type=submit]')
                    .click()
                    .get('.LoginForm-errorMessage')
                    .should('exist')
                    .contains(/all the fields/i);
            });
    });

    it('shows error when missing password', () => {
        cy.fixture('users/admin')
            .as('user')
            .then(user => {
                cy.visit('https://www.dev.zetkin.org/')
                    .getByText('Log in')
                    .click()
                    .get('input[type=email]')
                    .type(user.email)
                    .get('input[type=submit]')
                    .click()
                    .get('.LoginForm-errorMessage')
                    .should('exist')
                    .contains(/all the fields/i);
            });
    });

    it('shows error for unknown user', () => {
        cy.visit('https://www.dev.zetkin.org/')
            .getByText('Log in')
            .click()
            .get('input[type=email]')
            .type('testadmin2@example.com')
            .get('input[type=password]')
            .type('password')
            .get('input[type=submit]')
            .click()
            .get('.LoginForm-errorMessage')
            .should('exist')
            .contains(/e-mail/i)
            .get('.LoginForm-errorMessage')
            .find('a')
            .click()
            .url()
            .should('contain', '/register');
    });

    it('shows error for invalid password', () => {
        cy.fixture('users/admin')
            .as('user')
            .then(user => {
                cy.visit('https://www.dev.zetkin.org/')
                    .getByText('Log in')
                    .click()
                    .get('input[type=email]')
                    .type(user.email)
                    .get('input[type=password]')
                    .type(`${user.password}invalid`)
                    .get('input[type=submit]')
                    .click()
                    .get('.LoginForm-errorMessage')
                    .should('exist')
                    .contains(/password/i)
                    .getByText(/forgot/i)
                    .click()
                    .url()
                    .should('contain', '/lost-password');
            });
    });
   

});
