// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const apiUrl= 'https://localhost:7080';

Cypress.Commands.add("mockGet", (endpoint,FakeResponse) => {
    cy.intercept("GET", apiUrl+endpoint, {
      statusCode: 200,
      body: {FakeResponse },
    }).as("apiCall");
  });

  Cypress.Commands.add("mockPost", (endpoint,FakeResponse) => {
    cy.intercept("POST",apiUrl+endpoint, {
      statusCode: 200,
      body: {FakeResponse },
    }).as("apiCall");
  });