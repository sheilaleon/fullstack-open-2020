const commentsRouter = require('express').Router();
const Comments = require('../models/comments');

commentsRouter.get('/', async (request, response) => {
  const comments = await Comments.find({});
  response.json(comments);
});

module.exports = commentsRouter;
