/// <reference types="cypress" />

describe('Shop', () => {
  beforeEach(() => {
    cy.visit('shop'); // baseUrl: 'http://localhost:3000/' in cypress.config.ts
  });

  it('Shop page should be default page', () => {
    cy.shopShouldBeVisible();
  });

  describe('No product list', () => {
    it('Should not return product list', () => {
      // cy.intercept는 곧 Call될 API에 대해 미리 선언해서 intercept하는 개념이고,
      // 곧 Call될 API 기반으로 어떤 CRUD operation인지, 주소중에 뭘 포함하고 있는지 (*로 rest 표현가능), 그리고 as로 이름을 정해두고
      // 실제 API Call하는 action 취하기 (search)
      // cy.wait으로 (해당 as 이름을 @와 함께 적고) then을 사용하면, 그 결과값으로 API Call한 값을 받을 수 있다.
      // 실제로 cy.wait을 통해 API Call이 끝난시점까지 await 하고 그 밑으로 추가적인 작업을 하면 된다.

      cy.intercept('GET', '/v1/products(search=*').as('searchProduct'); // url => /products(search=* (작동 안함..)
      cy.search('wenlghqwjqk');
      cy.wait('@searchProduct').then((interception) => {
        // console.log(interception);
      });
      cy.get('[data-testid="productList-component-no-result"]').should('be.visible');
      cy.get('[data-testid="productList-component-no-result"]').should(
        'contain.text',
        'no search result',
      );
    });
  });

  describe('Product list', () => {
    beforeEach(() => {
      cy.intercept('GET', '/v1/products(search=*').as('searchProduct'); // url => /products(search=* (작동 안함..)
      cy.search('desk');
      cy.wait('@searchProduct').then((interception) => {
        // console.log(interception);
      });
    });
    it('Should return product list', () => {
      cy.get('[data-testid="productList-component"]')
        .children()
        .should('have.length.of.at.least', 1);
    });
    it('Should add 1 when clicking forward button in pagination', () => {
      cy.get('[data-testid="currentPageTestId"]').should('contain.text', 1);
      cy.get('[data-testid="forwardButtonTestId"]').click();
      cy.get('[data-testid="currentPageTestId"]').should('contain.text', 2);
    });
  });
});
