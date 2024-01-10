/* eslint-disable no-undef */

describe('Testing HU04', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });
  
  it('Update show progress', () => {
    cy.login(); 
    cy.contains('Arcane').click();
    cy.wait(1000);
    cy.get('[data-testid="plus-episode"]').click();
    cy.get('[data-testid="minus-episode"]').click();
    cy.get('[data-testid="plus-season"]').click();
    cy.get('[data-testid="minus-season"]').click();
  });

});
