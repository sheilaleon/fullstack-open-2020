const dummy = () => {
  return 1
}
// or
// const dummy = (blogs) => 1

const totalLikes = (listWithOneBlog) => {
  const likes = listWithOneBlog.reduce((total,  value) => {
    return total + value.likes
  }, 0)
  return likes
}

module.exports = {
  dummy,
  totalLikes
}