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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs,
  mostBlogs,
  mostLikes
}