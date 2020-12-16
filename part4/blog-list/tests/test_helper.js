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

const newBlog = {
  'title': 'Jest Test Blog Post Title',
  'author': 'Jest Test Author',
  'url': 'https://jestjs.io/docs/',
  'likes': 1
}

module.exports = {
  initialBlogs, newBlog
}