const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    id: 1,
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  // check if request is authenticated
  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const { id } = request.params;
  const blog = await Blog.findById(id);
  const user = await User.findById(decodedToken.id);

  // check if user is creator of the post before deleting
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    response
      .json(401)
      .json({ error: 'Unauthorised to delete this blog list item' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', {
    id: 1,
    username: 1,
    name: 1,
  });

  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
