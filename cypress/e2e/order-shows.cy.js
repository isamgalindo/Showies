/* eslint-disable no-undef */

describe('Testing HU07', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });
  
  it('Order shows', () => {
    cy.login();
    cy.get('#dropdown-basic').click();
    cy.get('.dropdown-menu > :nth-child(1)').click();
    cy.get('.orderBy-container > .form-control').select('Name');
    cy.wait(1000);
    cy.get('.orderBy-container > .form-control').select('Last seen');
    cy.wait(1000);
  });

});