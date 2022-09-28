/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login'); // baseUrl: 'http://localhost:3000/' in cypress.config.ts
  });

  it('Login page should be default page', () => {
    cy.loginShouldBeVisible();
  });

  describe('login fail', () => {
    it('if typing wrong email or wrong password', () => {
      cy.login('failEmail', 'failPassword');
      cy.get('[data-testid="loadingSpinner-component"').should('be.visible');
      cy.get('[data-testid="login-process-error"]')
        .should('be.visible')
        .contains('There is no matching user');
    });
  });

  describe('login success', () => {
    beforeEach(() => {
      cy.login('fake1@fake1.com', '12341234');
    });

    it('Should redirect to home page after login', () => {
      cy.get('[data-testid="loadingSpinner-component"').should('be.visible');
      cy.homeShouldBeVisible();
    });
    it('Should change login to logout in navigation after login', () => {
      cy.get('[data-testid="loadingSpinner-component"').should('be.visible');
      cy.homeShouldBeVisible();
      cy.get('[data-testid="navigation-container"]').within(() => {
        cy.get('a').should('not.contain.text', 'LOGIN');
        cy.get('a').should('contain.text', 'LOGOUT');
      });
    });
    it('Should contain username (from localStorage) in home-text after login', () => {
      cy.get('[data-testid="loadingSpinner-component"').should('be.visible');
      cy.homeShouldBeVisible();
      cy.getLocalStorage('auth').then(
        (auth) =>
          auth &&
          cy.get('[data-testid="home-text"]').should('contain.text', JSON.parse(auth)['username']),
      );
    });
    it('Should change logout to login in navigation after logout', () => {
      cy.get('[data-testid="loadingSpinner-component"').should('be.visible');
      cy.homeShouldBeVisible();
      cy.get('[data-testid="navigation-container"]').within(() => {
        cy.get('a').contains('LOGOUT').click();
      });
      cy.get('[data-testid="navigation-container"]').within(() => {
        cy.get('a').should('not.contain.text', 'LOGOUT');
        cy.get('a').should('contain.text', 'LOGIN');
      });
    });
    it('Should not contain username (from localStorage) in home-text after logout', () => {
      cy.get('[data-testid="loadingSpinner-component"').should('be.visible');
      cy.homeShouldBeVisible();
      cy.get('[data-testid="navigation-container"]').within(() => {
        cy.get('a').contains('LOGOUT').click();
      });
      cy.get('[data-testid="home-text"]').should('contain.text', 'Home');
    });
  });
});
