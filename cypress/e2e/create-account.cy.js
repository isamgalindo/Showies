/* eslint-disable no-undef */

describe('Testing HU08', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });

  it('Create account', () => {
    cy.get('.HE-login').click();
    cy.wait(1000);
    cy.get('.USR-signUp > h3').click();
    cy.wait(1000);
    cy.get('#formBasicName').type('Pepito Perez');
    cy.get('#formBasicEmail').type('example@example.com');
    cy.get('#formBasicPassword').type('Password');
    cy.get('.form-check-input').click();
    cy.get('#formBasicPasswordConfirm').type('Password');
    cy.get('.form-check-input').click();
    cy.get('.USR-button').click();
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:3001/');
  });

});