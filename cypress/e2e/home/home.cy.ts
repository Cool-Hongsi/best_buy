/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit(''); // baseUrl: 'http://localhost:3000/' in cypress.config.ts
  });

  it('Home page should be default page', () => {
    cy.homeShouldBeVisible();
  });

  it('Should redirect to home page on logo click', () => {
    cy.clickLogo();
    cy.homeShouldBeVisible();
  });

  it('Should redirect to home page on navigation (HOME) click', () => {
    cy.clickNavigationHome();
    cy.homeShouldBeVisible();
  });

  it('Should redirect to login page on navigation (LOGIN) click', () => {
    cy.clickNavigationLogin();
    cy.loginShouldBeVisible();
  });
});
