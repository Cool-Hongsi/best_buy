/// <reference types="cypress" />

describe('Cart', () => {
  beforeEach(() => {
    cy.addProductToCart(0);
    cy.addProductToCart(1);
    cy.visit('cart'); // baseUrl: 'http://localhost:3000/' in cypress.config.ts
  });

  it('Cart page should be default page', () => {
    cy.cartShouldBeVisible();
  });
  it('Should contain 2 products in cart', () => {
    cy.get('[data-testid="cartList-each-cell"]').should('have.length', 2);
  });
  it('Should delete 1 product when clicking deleteEachCart', () => {
    cy.get('.cartList-each-cell-delete').eq(0).click();
    cy.modalShouldBeVisible('deleteEachCartModalTestId');
    cy.get('[data-testid="modal-yes-button"]').click();
    cy.get('[data-testid="cartList-each-cell"]').should('have.length', 1);
    cy.get('[data-testid="countOfCart"]').should('contain.text', 1);
  });
  it('Should delete all products when clicking deleteAllCart', () => {
    cy.get('[data-testid="deleteAllCartButtonTestId"]').click();
    cy.modalShouldBeVisible('deleteAllCartModalTestId');
    cy.get('[data-testid="modal-yes-button"]').click();
    cy.get('[data-testid="cartList-each-cell"]').should('have.length', 0);
    cy.get('[data-testid="countOfCart"]').should('not.exist');
  });
});
