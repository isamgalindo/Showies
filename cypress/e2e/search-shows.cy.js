/* eslint-disable no-undef */

describe('Testing HU02', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });

  it('Search shows', () => {
    cy.login(); 
    cy.get('[data-testid="search-input"]').type('The');
    cy.wait(1000);
    cy.get('.SL-item').should('contain', 'The');
  });  

});

