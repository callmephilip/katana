/// <reference types="cypress" />

Cypress.Commands.add("dcy", (selector) => cy.get(`[data-cy=${selector}]`));
