// getting-started.js
var mongoose = require('mongoose');

// connect and create or change to db
mongoose.connect('mongodb://localhost/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection was succefull
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Succefull");
});

// ----------------------------------------SCHEMAS---------------------------------------------------------

// Schema for every new data document
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

// Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// ----------------------------------------COLLECTIONS-----------------------------------------------------

// Mongoose will convert the word Fruit into plurar to crate a collection
const Fruit = mongoose.model('Fruit', fruitSchema);
const Person = mongoose.model('Person', personSchema);

// ----------------------------------------DOCUMENTS-------------------------------------------------------

// ----------------------------------------FRUITS----------------------------------------------------------
const banana = new Fruit({
  name: 'Banana',
  rating: 8,
  review: 'Best yellow fruit.'
});

const apple = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'Just a fruit.'
});

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 5,
  review: 'A greenish fruit.'
});

// ----------------------------------------PERSONS---------------------------------------------------------

const person = new Person({
  name: 'Steve',
  age: 22
});

// ----------------------------------------ADD-DOCUMENTS---------------------------------------------------

// fruit.save();
// person.save();
// Fruit.insertMany([apple, kiwi], function(err){
//   if(err) console.log(err);
//   else console.log('Succefully saved all the fruits to fruitsDB');
// });

// ----------------------------------------FIND-DOCUMENTS--------------------------------------------------

Fruit.find(function (err, fruits) {
  if (err) return console.error(err);
  else {
    // Close connection
    mongoose.connection.close();
    fruits.forEach(function(element) {
      console.log(element.name);
    });
  }
});
