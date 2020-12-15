const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    `Please provide the password as an argument: node mongo.js <password>`,
  );
  process.exit;
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook.tlsxz.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 3) {
  console.log(`Phonebook:`);
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name}: ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  console.log(`Please provide a Name and Number to add to the phonebook`);
  process.exit(1);
} else if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook.`);
    mongoose.connection.close();
  });
}
