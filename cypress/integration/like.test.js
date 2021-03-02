/// <reference types="cypress" />

context('Comics', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should like a repository', () => {
    cy.intercept('https://api.github.com/users/*').as('api');

    cy.get('#username')
      .clear()
      .type('andersonmalheiro')
      .should('have.value', 'andersonmalheiro');

    cy.wait(1000);

    cy.get('[data-testid=submit_search]').click();

    cy.wait(1000);

    cy.wait('@api').then(() => {
      cy.get(
        ':nth-child(1) > .dXyeDi > .czCeWV > [data-testid=like_button]'
      ).click();

      cy.wait(1000);

      cy.get('[data-testid=toggle_drawer]').click();

      cy.get(
        '[data-testid=drawer] > .sc-fodVxV > .sc-fFubgz > .dXyeDi > .bHklPO > .title'
      ).should('have.text', 'trion-development/docker-ng-cli-karma');
    });
  });

  //   it('should clear search', () => {
  //     cy.intercept('https://api.github.com/users/*').as('api');

  //     cy.get('#username')
  //       .clear()
  //       .type('andersonmalheiro')
  //       .should('have.value', 'andersonmalheiro');

  //     cy.wait(1000);

  //     cy.get('[data-testid=submit_search]').click();

  //     cy.wait(1000);

  //     cy.wait('@api').then(() => {
  //       cy.get('.name').should('have.text', 'Anderson Malheiro de Carvalho');

  //       cy.wait(1000);

  //       cy.get('[data-testid=clear_search]').click();

  //       cy.get('h1').should(
  //         'have.text',
  //         'Search for a github user to get some cool info about it'
  //       );
  //     });
  //   });
});
