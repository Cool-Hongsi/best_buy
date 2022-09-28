// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    homeShouldBeVisible(): Chainable<void>;

    clickLogo(): Chainable<void>;

    clickNavigationHome(): Chainable<void>;

    clickNavigationLogin(): Chainable<void>;

    loginShouldBeVisible(): Chainable<void>;

    login(email: string, password: string): Chainable<void>;

    shopShouldBeVisible(): Chainable<void>;

    search(searchTerm: string): Chainable<void>;

    shopDetailShouldBeVisible(sku: number): Chainable<void>;

    addProductToCart(index: number): Chainable<void>;

    cartShouldBeVisible(): Chainable<void>;

    modalShouldBeVisible(modalTestId: string): Chainable<void>;
  }
}
