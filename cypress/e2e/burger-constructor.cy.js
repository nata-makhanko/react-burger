require('@4tw/cypress-drag-drop');

describe('Burger constructor test', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('http://localhost:3000/');
  });

  it('should open, check name and close ingredient', () => {
    cy.get('#sauce > div > a:first-child').click();
    cy.get('[data-testid=name_ingredient]').should('have.text', 'Соус Spicy-X');
    cy.get('[class^="modal_close__"]').click();
  });

  it('should make drag-and-drop and click to order', () => {
    cy.get('#bun > div > a:first-child').drag('.burger_constructor_bun');
    cy.get('#main > div > a:first-child').drag('[class^="burger-constructor_wrp__"]');
    cy.get('#sauce > div > a:first-child').drag('[class^="burger-constructor_wrp__"]');
    cy.get('button').contains('Оформить заказ').click();
  });

})