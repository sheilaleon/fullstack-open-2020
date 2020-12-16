const mongooose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('blogs api', () => {
  test('blog list is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a total of 5 blog links', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(5)
  })

  afterAll(() => {
    mongooose.connection.close()
  })
})