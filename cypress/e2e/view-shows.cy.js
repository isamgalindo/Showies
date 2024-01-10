/* eslint-disable no-undef */

describe('Testing HU01', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:3001');
    cy.wait(7000)
 });
  
  it('View shows', () => {
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

});
