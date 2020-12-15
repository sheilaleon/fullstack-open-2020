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

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323423',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendick',
//     number: '39-23-6423122',
//   },
//   {
//     id: 5,
//     name: 'Test User',
//     number: '02-4563-1235',
//   },
//   {
//     id: 6,
//     name: 'Test User Two',
//     number: '02-4563-1235',
//   },
// ];

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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
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
  if (persons.find((person) => person.name === body.name)) {
    return response.status(409).json({
      error: 'name already exists',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
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
