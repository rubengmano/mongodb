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
  name: {
    type: String,
    required: [true, 'Name is mandatory']
  },
  rating: {
    type: Number,
    // Argumements' validation
    min: 1,
    max: 10
  },
  review: String
});

// Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

// ----------------------------------------COLLECTIONS-----------------------------------------------------

// Mongoose will convert the word Fruit into plurar to crate a collection
const Fruit = mongoose.model('Fruit', fruitSchema);
const Person = mongoose.model('Person', personSchema);

// ----------------------------------------DOCUMENTS-------------------------------------------------------

// ----------------------------------------FRUITS----------------------------------------------------------
const banana = new Fruit({
  name: 'Banana',
  rating: 34,
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

// kiwi.save();
// banana.save();
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

// --------------------------------------UPDATE-DOCUMENTS-------------------------------------------------

// Fruit.findOneAndUpdate( {rating: 7 }, {  name: "Apple" }, function(err){
//   if(err) console.log(err);
//   else console.log("Success");
// } );

// Before updating the schema needs to be changed
Person.updateOne({name: 'Steve'}, {favouriteFruit: kiwi}, function(err){
  if(err) console.log(err);
  else console.log(`Steve's fav fruit is kiwi`);
});


// --------------------------------------DELETE-DOCUMENTS-------------------------------------------------

// Fruit.deleteOne({name: 'Kiwi'}, function(err){
//   if(err) console.log('err');
//   else console.log("Deleted");
// })
