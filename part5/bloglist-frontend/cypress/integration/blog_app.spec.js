describe('Blog app', function () {
  beforeEach(function () {
    // Clean up database
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    //  Create a new user to login
    const user = {
      username: 'testUser',
      name: 'Test User',
      password: 'secretPassword',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('login form is shown when not logged in', function () {
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy="login-username"]').type('testUser');
      cy.get('[data-cy="login-password"]').type('secretPassword');
      cy.get('[data-cy="login-submit"]').click();

      cy.contains('Test User logged in.');
    });

    it('fails with incorrect credentials', function () {
      cy.get('[data-cy="login-username"]').type('tester');
      cy.get('[data-cy="login-password"]').type('wrongPassword');
      cy.get('[data-cy="login-submit"]').click();

      cy.get('.error').should('contain', 'Incorrect username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(185, 28, 28)');
    });
  });
});
