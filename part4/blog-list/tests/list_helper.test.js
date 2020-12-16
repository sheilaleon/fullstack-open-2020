

const listHelper = require('../utils/list_helper')

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
const blogs = [
  {
    'title': 'Understanding Modules, Import and Export in JavaScript',
    'author': 'Tania Rascia',
    'url': 'https://www.taniarascia.com/javascript-modules-import-export/',
    'likes': 1,
    'id': '5fd94ecd788b3820307cc0af'
  },
  {
    'title': 'How To Use the JavaScript Developer Console',
    'author': 'Lisa Tagliaferri',
    'url': 'https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-developer-console',
    'likes': 1,
    'id': '5fd94f0c788b3820307cc0b0'
  },
  {
    'title': 'JavaScript to Know for React',
    'author': 'Kent C. Dodds',
    'url': 'https://kentcdodds.com/blog/javascript-to-know-for-react',
    'likes': 1,
    'id': '5fd94f5a788b3820307cc0b1'
  },
  {
    'title': 'React Tutorial: An Overview and Walkthrough',
    'author': 'Tania Rascia',
    'url': 'https://www.taniarascia.com/getting-started-with-react/',
    'likes': 3,
    'id': '5fd9a885c78a79990d49d946'
  },
  {
    'title': 'Design for Developers: Specific Steps to Improve Your Website Design',
    'author': 'Tania Rascia',
    'url': 'https://www.taniarascia.com/design-for-developers/',
    'likes': 1,
    'id': '5fd9a8adc78a79990d49d947'
  }
]

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOnlyOneBlog)
    expect(result).toBe(12)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  })
})

describe('favourite blogs', () => {
  test('when list has no blogs', () => {
    const result = listHelper.favouriteBlogs(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favouriteBlogs(listWithOnlyOneBlog)
    expect(result).toEqual({
      'author': 'Tania Rascia', 'likes': 12,
      'title': 'Understanding Modules, Import and Export in JavaScript'
    })
  })

  test('when list has multiple blogs equals the most liked blog of that', () => {
    const result = listHelper.favouriteBlogs(blogs)
    expect(result).toEqual({
      'author': 'Tania Rascia',
      'likes': 3,
      'title': 'React Tutorial: An Overview and Walkthrough',
    })
  })
})

describe('Most Blogs', () => {
  test('when list has no blogs', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals the author blog count of that', () => {
    const result = listHelper.mostBlogs(listWithOnlyOneBlog)
    expect(result).toEqual({
      'author': 'Tania Rascia',
      'blogs': 1,
    })
  })

  test('when list has multiple blog equals the author of highest blog count', () => {
    const result = listHelper.mostBlogs(blogs)
    console.log(result)
    // expect(result).toEqual({
    //   'author': 'Tania Rascia',
    //   'blogs': 3,
    // })
  })
})