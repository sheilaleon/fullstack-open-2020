require('dotenv').config();
const { response } = require('express');
const express = require('express');
const app = express();
const Person = require('./models/person');

// Middleware
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// morgan logging
morgan.token('body', (req) => {
  const body = JSON.stringify(req.body);
  if (body === '{}') {
    return '';
  }
  return body;
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

const generateId = () => {
  const id = Math.floor(Math.random() * Math.floor(100000));
  return id;
};

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);

  // response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name is required',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'a number is required',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length}.</p>
    <p>${new Date().toString()}</p>`,
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
