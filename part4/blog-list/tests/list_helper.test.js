const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const emptyList = [
  ]
  const listWithOnlyOneBlog = [
    {
      'title': 'Understanding Modules, Import and Export in JavaScript',
      'author': 'Tania Rascia',
      'url': 'https://www.taniarascia.com/javascript-modules-import-export/',
      'likes': 12,
      'id': '5fd94ecd788b3820307cc0af'
    }
  ]
  const listWithSeveralBlogs = [
    {
      'title': 'Understanding Modules, Import and Export in JavaScript',
      'author': 'Tania Rascia',
      'url': 'https://www.taniarascia.com/javascript-modules-import-export/',
      'likes': 12,
      'id': '5fd94ecd788b3820307cc0af'
    },
    {
      'title': 'How To Use the JavaScript Developer Console',
      'author': 'Lisa Tagliaferri',
      'url': 'https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-developer-console',
      'likes': 6,
      'id': '5fd94f0c788b3820307cc0b0'
    },
    {
      'title': 'JavaScript to Know for React',
      'author': 'Kent C. Dodds',
      'url': 'https://kentcdodds.com/blog/javascript-to-know-for-react',
      'likes': 4,
      'id': '5fd94f5a788b3820307cc0b1'
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOnlyOneBlog)
    expect(result).toBe(12)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    expect(result).toBe(22)
  })
})