const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info(`Connecting to ${config.MONGODB_URI}...`)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
  })
  .then(() => {
    logger.info('Connected to MongoDB.')
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app