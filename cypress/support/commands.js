/* eslint-disable no-undef */
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

Cypress.Commands.add('login', () => {
  cy.get('.HE-login').click();
  cy.wait(1000);
  cy.get('#formBasicEmail').type('l.restrepop@uniandes.edu.co');
  cy.get('#formBasicPassword').type('Tommy2013');
  cy.get('.form-check-input').click();
  cy.get('.USR-button').click();
  cy.wait(1000);
  cy.url().should('eq', 'http://localhost:3001/');
})