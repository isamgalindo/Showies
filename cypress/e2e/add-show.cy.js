/* eslint-disable no-undef */

describe('Testing HU03', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });

  it('Add show', () => {
    cy.login();
    cy.get('[data-testid="add-show-home"]').click();
    cy.get('.css-qbdosj-Input').type("The Crown").trigger('keydown', {key: 'Enter',});
    cy.get('[data-testid="show-season"]').type(6);
    cy.get('[data-testid="show-episode"]').type(1);
    cy.get('[data-testid="add-show"]').click();
    cy.wait(1000);
    cy.get('.SL-item').should('contain', 'The Crown');
    cy.contains('The Crown').click();
    cy.wait(1000);
  });
  
});