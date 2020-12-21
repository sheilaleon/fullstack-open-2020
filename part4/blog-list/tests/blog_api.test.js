const mongooose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
// const blogsRouter = require('../controllers/blogs')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token = null

beforeEach(async () => {
  // ? Initialise DB
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  // ? Create test user
  const passwordHash = await bcrypt.hash('randomPassword', 10)
  const user = new User({ username: 'testUser', name: 'Test User', passwordHash })

  await user.save()

  // ? Get test user's token
  const response = await api
    .post('/api/login')
    .send({ username: 'testUser', password: 'randomPassword' })

  token = response.body.token
})

describe('blogs api', () => {
  test('blog list is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a total of 5 blog links', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('_id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a blog post can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('Jest Test Blog Post Title')
  })

  test('if request is missing likes property, it will default to 0', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogMissingLikes)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.likes)
    expect(contents[2]).toBe(0)
  })

  test('blogs without titles and urls are not added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogMissingContent)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('deletion of blog post', async () => {
    // ? Set up test user's post to be deleted

    const blogToBeDeleted = {
      title: 'I will be deleted',
      author: 'An Author',
      url: 'https://delete.me',
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogToBeDeleted)

    // const response = await api.get('/api/blogs')
    // const contents = response.body.map(r => r.id)
    const blogToDelete = response.body.id
    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    const blogsAtEndResponse = await api.get('/api/blogs')
    const blogsAtEnd = blogsAtEndResponse.body.map(r => r.id)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const newContent = blogsAtEnd.map(r => r.id)
    expect(newContent).not.toBe(blogToDelete)
  })

  test('updates likes of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 3 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.likes).toBe(3)
  })

  afterAll(() => {
    mongooose.connection.close()
  })
})