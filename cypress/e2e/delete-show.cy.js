/* eslint-disable no-undef */

describe('Testing HU05', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3000');
    cy.wait(7000)
 });
  
  it('Delete show', () => {
    cy.login();
    cy.contains('Arcane').click();
    cy.get('.D-delete').click();
    cy.get('.btn-secondary').click();
    cy.get('.D-delete').click();
    cy.get('.btn-danger').click();
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('.SL-container').should('not.contain', 'Arcane');
  });

});