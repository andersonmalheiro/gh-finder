/// <reference types="cypress" />

context('Repository interations', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
  });

  afterEach(() => {
    cy.preserveLocalStorage();
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
      cy.get('[data-testid=user_favs_docker-ng-cli-karma]').click();

      cy.wait(1000);

      cy.get('[data-testid=toggle_drawer]').click();

      cy.get('[data-testid=my_favs_title_docker-ng-cli-karma]')
        .should('have.text', 'trion-development/docker-ng-cli-karma');

      cy.window()
        .then(win => {
          const likedRepos = win.localStorage.getItem('liked_repos');
          return likedRepos;
        })
        .then((likedRepos) => {
          expect(likedRepos).to.exist;
          const parsed = JSON.parse(likedRepos);
          const isArray = Array.isArray(parsed);
          expect(isArray).to.be.equal(true);
          expect(parsed).to.have.length(1);
        });
    });
  });

  it('should dislike a repository', () => {
    cy.get('[data-testid=toggle_drawer]').click();

    cy.get('[data-testid=my_favs_title_docker-ng-cli-karma]')
      .should('have.text', 'trion-development/docker-ng-cli-karma');

    cy.wait(1000);

    cy.get('[data-testid=my_favs_docker-ng-cli-karma]').click();

    cy.window()
      .then(win => {
        const likedRepos = win.localStorage.getItem('liked_repos');
        return likedRepos;
      })
      .then((likedRepos) => {
        expect(likedRepos).to.exist;
        const parsed = JSON.parse(likedRepos);
        const isArray = Array.isArray(parsed);
        expect(isArray).to.be.equal(true);
        expect(parsed).to.have.length(0);

        cy.get('p').should('have.text', 'No data...');
      });
  });
});
