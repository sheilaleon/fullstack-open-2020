// Login

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, token }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    username,
    name,
    password,
  });
  cy.visit('http://localhost:3000');
});
