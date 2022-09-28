Cypress.Commands.add('homeShouldBeVisible', () => {
  cy.url().should('eq', Cypress.config().baseUrl);
  cy.get('[data-testid="home-component"]').should('be.visible');
});

Cypress.Commands.add('clickLogo', () => {
  cy.get('[data-testid="logo"]').should('be.visible').click();
});

Cypress.Commands.add('clickNavigationHome', () => {
  cy.get('[data-testid="navigation-container"]').within(() => {
    cy.get('a').contains('HOME').click(); // <Link> = <a>
  });
});

Cypress.Commands.add('clickNavigationLogin', () => {
  cy.get('[data-testid="navigation-container"]').within(() => {
    cy.get('a').contains('LOGIN').click();
  });
});

Cypress.Commands.add('loginShouldBeVisible', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}login`);
  cy.get('[data-testid="login-component"]').should('be.visible');
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-testid="loginEmailInputTestId"]').type(email);
  cy.get('[data-testid="loginPasswordInputTestId"]').type(password);
  cy.get('[data-testid="loginSubmitButtonTestId"]').click();
});

Cypress.Commands.add('shopShouldBeVisible', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}shop`);
  cy.get('[data-testid="shopContainer-component"]').should('be.visible');
});

Cypress.Commands.add('search', (searchTerm) => {
  cy.get('[data-testid="searchTermInputTestId"]').type(searchTerm);
  cy.get('[data-testid="searchSubmitButtonTestId"]').click();
});

Cypress.Commands.add('shopDetailShouldBeVisible', (sku) => {
  cy.url().should('eq', `${Cypress.config().baseUrl}shop/${sku}`);
  cy.get('[data-testid="productDetailContainer-component"]').should('be.visible');
});

Cypress.Commands.add('addProductToCart', (index) => {
  cy.visit('shop');
  cy.intercept('GET', '/v1/products(search=*').as('searchProduct'); // url => /products(search=* (작동 안함..)
  cy.search('desk');
  cy.wait('@searchProduct');
  cy.get('[data-testid="productList-component"]').children().eq(index).click();
  cy.get('[data-testid="productDetailMainCartButtonTestId"]').click();
});

Cypress.Commands.add('cartShouldBeVisible', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}cart`);
  cy.get('[data-testid="cartContainer-component"]').should('be.visible');
});

Cypress.Commands.add('modalShouldBeVisible', (modalTestId) => {
  cy.get(`[data-testid="${modalTestId}"]`).should('be.visible');
});
