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

  test('_id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  afterAll(() => {
    mongooose.connection.close()
  })
})