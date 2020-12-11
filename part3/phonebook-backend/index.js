const { response } = require('express');
const express = require('express');
const app = express();

// Middleware
const morgan = require('morgan');

app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323423',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
  {
    id: 5,
    name: 'Test User',
    number: '02-4563-1235',
  },
  {
    id: 6,
    name: 'Test User Two',
    number: '02-4563-1235',
  },
];

const generateId = () => {
  const id = Math.floor(Math.random() * Math.floor(100000));
  return id;
};

app.get('/', (request, response) => {
  response.send('<h1>Hello 🌎</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
