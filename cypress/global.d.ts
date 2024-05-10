/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    dcy(selector: string): Chainable<JQuery<HTMLElement>>;
  }
}
