/// <reference types="cypress" />

describe('ShopDetail', () => {
  let firstDeskProduct;

  beforeEach(() => {
    cy.visit('shop'); // baseUrl: 'http://localhost:3000/' in cypress.config.ts
    cy.intercept('GET', '/v1/products(search=*').as('searchProduct'); // url => /products(search=* (작동 안함..)
    cy.search('desk');
    cy.wait('@searchProduct').then((interception) => {
      firstDeskProduct = interception.response?.body.products[0];
    });
    cy.get('[data-testid="productList-component"]').children().first().click();
  });

  it('ShopDetail page should be default page', () => {
    cy.shopDetailShouldBeVisible(firstDeskProduct.sku);
  });
  it('Should update current count when clicking decrease and increase button', () => {
    cy.get('[data-testid="product-detail-main-count"]').should('contain.text', 1);
    cy.get('[data-testid="productDetailMainIncreaseButtonTestId"]').click();
    cy.get('[data-testid="productDetailMainIncreaseButtonTestId"]').click();
    cy.get('[data-testid="product-detail-main-count"]').should('contain.text', 3);
    cy.get('[data-testid="productDetailMainDecreaseButtonTestId"]').click();
    cy.get('[data-testid="product-detail-main-count"]').should('contain.text', 2);
  });
  it('Should render matched data in measurement', () => {
    cy.get('[data-testid="productDetailMeasurementButton_Color"]').click();
    cy.get('[data-testid="product-detail-measurement-data"]').should(
      'contain.text',
      firstDeskProduct.color,
    );
    cy.get('[data-testid="productDetailMeasurementButton_Weight"]').click();
    cy.get('[data-testid="product-detail-measurement-data"]').should(
      'contain.text',
      firstDeskProduct.weight,
    );
  });
  it('Should update cart when clicking Add to cart button', () => {
    cy.get('[data-testid="productDetailMainCartButtonTestId"]').click();
    cy.get('[data-testid="countOfCart"]').should('contain.text', 1);
    cy.get('[data-testid="productDetailMainCartButtonTestId"]').click();
    cy.get('[data-testid="countOfCart"]').should('contain.text', 1); // only increase count value
  });
});
