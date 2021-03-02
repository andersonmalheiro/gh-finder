/// <reference types="cypress" />

context('Search user', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should search user', () => {
    cy.intercept('https://api.github.com/users/*').as('api');

    cy.get('#username')
      .clear()
      .type('andersonmalheiro')
      .should('have.value', 'andersonmalheiro');

    cy.wait(1000);

    cy.get('[data-testid=submit_search]').click();

    cy.wait(1000);

    cy.wait('@api').then(() => {
      cy.get('.name').should('have.text', 'Anderson Malheiro de Carvalho');
    });
  });

  it('should clear search', () => {
    cy.intercept('https://api.github.com/users/*').as('api');

    cy.get('#username')
      .clear()
      .type('andersonmalheiro')
      .should('have.value', 'andersonmalheiro');

    cy.wait(1000);

    cy.get('[data-testid=submit_search]').click();

    cy.wait(1000);

    cy.wait('@api').then(() => {
      cy.get('.name').should('have.text', 'Anderson Malheiro de Carvalho');

      cy.wait(1000);

      cy.get('[data-testid=clear_search]').click();

      cy.get('h1').should(
        'have.text',
        'Search for a github user to get some cool info about it'
      );
    });
  });
});
