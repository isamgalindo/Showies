/* eslint-disable no-undef */

describe('Testing Showies', () => {
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

  it('2. Create account (HU08)', () => {
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

  it('3. Login', () => {
    cy.login();
  });

  it('4. Language change (i18n)', () => {
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

  it('5. View shows (HU01)', () => {
    const totalShows = 16; 
    const showsPerSet = 5; 

    cy.login();

    for (let i = 1; i <= totalShows; i++) {
      cy.get(`.SL-show-cards > :nth-child(${i})`).click();
      cy.wait(1000);

      if (i % showsPerSet === 0 && i !== totalShows) {
        cy.get('.SL-right-arrow').click();
      }
    }
  });

  it('6. Add show (HU03)', () => {
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
  
  it('7. Search shows (HU02)', () => {
    cy.login(); 
    cy.get('[data-testid="search-input"]').type('The');
    cy.wait(1000);
    cy.get('.SL-item').should('contain', 'The');
  });  

  it('8. Update show progress (HU04)', () => {
    cy.login(); 
    cy.contains('Arcane').click();
    cy.wait(1000);
    cy.get('[data-testid="plus-episode"]').click();
    cy.get('[data-testid="minus-episode"]').click();
    cy.get('[data-testid="plus-season"]').click();
    cy.get('[data-testid="minus-season"]').click();
  });

  it('9. Delete show (HU05)', () => {
    cy.login();
    cy.contains('Arcane').click();
    cy.get('.D-delete').click();
    cy.get('.btn-secondary').click();
    cy.get('.D-delete').click();
    cy.get('.btn-danger').click();
    cy.wait(1000);
    cy.url().should('eq', 'http://localhost:3001/');
    cy.get('.SL-container').should('not.contain', 'Arcane');
  });

  it('10. Filter shows by genre (HU06)', () => {
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

  it('11. Order shows (HU07)', () => {
    cy.login();
    cy.get('#dropdown-basic').click();
    cy.get('.dropdown-menu > :nth-child(1)').click();
    cy.get('.orderBy-container > .form-control').select('Name');
    cy.wait(1000);
    cy.get('.orderBy-container > .form-control').select('Last seen');
    cy.wait(1000);
  });

});