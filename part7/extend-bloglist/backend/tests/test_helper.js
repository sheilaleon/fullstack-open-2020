const Blog = require('../models/blog')
const User = require('../models/user')

// ? Blog related helpers
const dummy = () => {
  return 1
}
// or
// const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const likes = blogs.reduce((total,  value) => {
    return total + value.likes
  }, 0)
  return likes
}

const favouriteBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  // find highest voted blog
  const highestVoted = blogs.reduce((previous, current) => previous.likes > current.likes ? previous : current)

  const fav = {
    title: highestVoted.title,
    author: highestVoted.author,
    likes: highestVoted.likes
  }

  return fav
}

const mostBlogs = (blogs) => {
  // get authors
  const authors = blogs.map((blog) => blog.author)

  if (!authors || authors.length === 0) {
    return null
  }

  // get blog counts of authors
  const blogTotal = authors.reduce((accumulator, currentValue) => {
    accumulator[currentValue] ? accumulator[currentValue]++ : (accumulator[currentValue]= 1)
    return accumulator
  }, {})

  // make an array of the author with most blogs
  const blogsByAuthor = Object.entries(blogTotal, ).reduce((a, b) => (blogTotal[a] > blogTotal[b] ? b : a))

  const popularAuthor = {
    author: blogsByAuthor[0],
    blogs: blogsByAuthor[1]
  }

  return popularAuthor
}

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author)

  if (!authors || authors.length === 0) {
    return null
  }

  // remove dups and create array of Authors
  // const uniqueAuthors = new Set(authors)
  // const authorsArray = [...uniqueAuthors]
  let uniqueAuthors = [...new Set(authors)]

  const authorLikes = uniqueAuthors.map((author) => {
    const authorBlogs = blogs.filter((blog) => blog.author === author)

    const calculateAuthorLikes = authorBlogs.reduce((accumulator, currentValue) =>
      accumulator + currentValue.likes, 0,
    )
    // create return object of author and total number of likes
    const likeTotalsByAuthor = {
      author: author,
      likes: calculateAuthorLikes
    }

    return likeTotalsByAuthor
  })

  return authorLikes.reduce((previous, current) => (previous.likes > current.likes ? previous : current) )
}

const initialBlogs = [
  {
    'title': 'Understanding Modules, Import and Export in JavaScript',
    'author': 'Tania Rascia',
    'url': 'https://www.taniarascia.com/javascript-modules-import-export/',
    'likes': 1,
  },
  {
    'title': 'How To Use the JavaScript Developer Console',
    'author': 'Lisa Tagliaferri',
    'url': 'https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-developer-console',
    'likes': 1,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const newBlog = {
  'title': 'Jest Test Blog Post Title',
  'author': 'Jest Test Author',
  'url': 'https://jestjs.io/docs/',
  'likes': 1
}

const blogMissingLikes = {
  'title': 'Test Blog Missing Likes',
  'author': 'Jest Test Author',
  'url': 'https://jestjs.io/docs/',
}

const blogMissingContent = {
  'author': 'Jest Test Author',
  'likes': 1
}

// ? User related helpers
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs,
  mostBlogs,
  mostLikes,
  initialBlogs,
  blogsInDb,
  newBlog,
  blogMissingLikes,
  blogMissingContent,
  usersInDb,
}