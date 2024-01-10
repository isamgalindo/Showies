/* eslint-disable no-undef */

describe('Testing other functionalities', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });
  
  it('1. Contact navigation', () => {
    cy.get('.HE-contact').click(); 
    cy.wait(1000);
    cy.get('.HE-logoName').click();
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:3001/');
  });

  it('2. Language change (i18n)', () => {
    cy.get('#dropdown-basic').click();
    cy.get('.dropdown-menu > :nth-child(1)').click();
    cy.wait(1000);
    cy.get('#dropdown-basic').click();
    cy.get('.dropdown-menu > :nth-child(2)').click();
    cy.wait(1000);
    cy.get('#dropdown-basic').click();
    cy.get('.dropdown-menu > :nth-child(3)').click();
    cy.wait(1000);
  });

  it('3. Login', () => {
    cy.login();
  });
  
});
