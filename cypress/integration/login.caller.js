import 'cypress-testing-library/add-commands';

let user;
context('Login', () => {
    beforeEach(() => {
        cy.on('window:confirm', () => false);
        cy.fixture('users/caller')
            .as('user')
            .then(userCaller => {
                user = userCaller;
            });
    });

    it('can be achieved from home page', () => {
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

    it('works on mobile', () => {
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

    it('shows error when missing email', () => {
        cy.visit('https://www.dev.zetkin.org/')
            .getByText('Log in')
            .click()
            .get('input[type=password]')
            .type(user.password)
            .get('input[type=submit]')
            .click()
            .get('.LoginForm-errorMessage')
            .should('exist');
        //.contains(/all the fields/i);
    });

    it('shows error when missing password', () => {
        cy.visit('https://www.dev.zetkin.org/')
            .getByText('Log in')
            .click()
            .get('input[type=email]')
            .type(user.email)
            .get('input[type=submit]')
            .click()
            .get('.LoginForm-errorMessage')
            .should('exist');
        //.contains(/all the fields/i);
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
            .should('exist');
        /* .contains(/e-mail/i)
        .get('.LoginForm-errorMessage')
        .find('a')
        .click()
        .url()
        .should('contain', '/register'); */
    });

    it('shows error for invalid password', () => {
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
            .should('exist');
        /* .contains(/password/i)
        .getByText(/forgot/i)
        .click()
        .url()
        .should('contain', '/lost-password'); */
    });
    
});
