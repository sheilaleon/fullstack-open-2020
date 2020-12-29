describe('Blog app', function () {
  beforeEach(function () {
    // Clean up database
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    //  Create a new user to login
    cy.createUser({
      username: 'testUser',
      name: 'Test User',
      password: 'secretPassword',
    });
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

    it('A blog can be created', function () {
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

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Understanding Generators in JavaScript',
          author: 'Tania Rascia',
          url:
            'https://www.taniarascia.com/understanding-generators-in-javascript/',
        });
      });

      it('it can be liked', function () {
        cy.get('[data-cy="blog-view"]').click();
        cy.contains('0 Likes');

        cy.get('[data-cy="blog-like"]').click();
        cy.contains('1 Like');
      });

      it('it can be deleted', function () {
        cy.get('[data-cy="blog-view"]').click();
        cy.contains('Understanding Generators in JavaScript').should('exist');

        cy.get('[data-cy="blog-delete"]').click();
        cy.contains('Understanding Generators in JavaScript').should(
          'not.exist',
        );
      });
    });
  });

  describe('When another user logs in', function () {
    beforeEach(function () {
      // create a blog post under another user
      cy.login({ username: 'testUser', password: 'secretPassword' });
      cy.createBlog({
        title: 'Docker Tutorial: Create a CI/CD Pipeline',
        author: 'Tania Rascia',
        url:
          'https://www.taniarascia.com/continuous-integration-pipeline-docker/',
      });

      // create a new user to test deletion
      cy.createUser({
        username: 'differentUser',
        name: 'Different User',
        password: 'password',
      });
      cy.login({ username: 'differentUser', password: 'password' });
    });

    it('user cannot delete a blog created by a different user', function () {
      cy.contains('Different User logged in.');
      cy.contains('Docker Tutorial: Create a CI/CD Pipeline');

      cy.get('[data-cy="blog-view"]').click();
      cy.contains('Remove').should('not.exist');
    });
  });

  describe.only('Blog listings', function () {
    beforeEach(function () {
      cy.login({ username: 'testUser', password: 'secretPassword' });
      cy.createBlog({
        title: 'Docker Tutorial: Create a CI/CD Pipeline',
        author: 'Tania Rascia',
        url:
          'https://www.taniarascia.com/continuous-integration-pipeline-docker/',
        likes: 10,
      });
      cy.createBlog({
        title: 'Understanding Generators in JavaScript',
        author: 'Tania Rascia',
        url:
          'https://www.taniarascia.com/understanding-generators-in-javascript/',
        likes: 2,
      });
      cy.createBlog({
        title: 'Redux Tutorial: An Overview and Walkthrough',
        author: 'Tania Rascia',
        url: 'https://www.taniarascia.com/redux-react-guide/',
        likes: 0,
      });
      cy.createBlog({
        title: 'How Stripe Designs Beautiful Websites',
        author: 'Lee Robinson',
        url: 'https://leerob.io/blog/how-stripe-designs-beautiful-websites',
        likes: 3,
      });
      cy.createBlog({
        title: 'Authentication Patterns for Next.js',
        author: 'Lee Robinson',
        url: 'https://leerob.io/blog/nextjs-authentication',
        likes: 6,
      });
    });

    it('blogs are ordered by number of likes', function () {
      cy.get('[data-test="likes"]').then(($blog) => {
        expect($blog).to.have.length(5);

        for (let i = 0; i < $blog.length; i++) {
          if (i < $blog.length - 1) {
            expect(Number($blog.find('strong')[i].innerText)).to.be.least(
              Number($blog.find('strong')[i + 1].innerText),
            );
          } else {
            expect(Number($blog.find('strong')[i].innerText)).to.be.most(
              Number($blog.find('strong')[0].innerText),
            );
          }
        }
      });
    });
  });
});
