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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs
}