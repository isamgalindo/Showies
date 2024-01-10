/* eslint-disable no-undef */

describe('Testing HU06', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });
  
  it('Filter shows by genre', () => {
    cy.login();
    cy.get('#dropdown-basic').click();
    cy.get('.dropdown-menu > :nth-child(1)').click(); 
    cy.get('.genre-filter-container > .form-control').select('Drama');
    cy.wait(1000);
    cy.get('.SL-item').should('contain', 'Succession');
    cy.contains('Succession').click();
    cy.wait(1000);
    cy.get(':nth-child(3) > span').should('contain', 'Drama');
  });

});