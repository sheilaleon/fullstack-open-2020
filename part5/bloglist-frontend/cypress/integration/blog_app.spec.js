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

  describe('When logged in', function () {
    // Login user before each test
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'secretPassword' });
    });

    it.only('A blog can be created', function () {
      cy.contains('Add New Blog').click();

      cy.get('[data-cy="add-blog-title"]').type(
        'Understanding Generators in JavaScript',
      );
      cy.get('[data-cy="add-blog-author"]').type('Tania Rascia');
      cy.get('[data-cy="add-blog-url"]').type(
        'https://www.taniarascia.com/understanding-generators-in-javascript/',
      );
      cy.get('[data-cy="add-blog-submit"]').click();

      cy.contains('Understanding Generators in JavaScript');
    });
  });
});
