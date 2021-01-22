const mongoose = require("mongoose");

//connect to DB
mongoose.connect("mongodb://localhost:27017/fruitDB", { useNewUrlParser: true, useUnifiedTopology: true });

//how the document should look like
const fruitSchema = new mongoose.Schema({
  name: {
    type : String,
    required: [true, "Please check your entry because it has no name"]
  },
  rating: {
    type : Number,
    min : 1,
    max : 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Mango",
  rating: 7,
  review: "GG"
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Atomic Senpai",
  age: 23,
});

//person.save();

Person.updateOne({name:"Atomic Senpai"}, {favoriteFruit: fruit}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Updated successfully")
  }
});

Fruit.find(function(err, data){
  if (err) {

  } else {
    mongoose.connection.close();
    data.forEach(function(d){
      console.log(d.name);
    });
  }
});

/*Fruit.updateOne({_id:"5f32c1d6bfac1d29c842ad34"}, {name:"Peach"}, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfully updated document");
  }
});*/

// Fruit.deleteOne({_id:"5f32c1d6bfac1d29c842ad34"}, function(err){
//   if (err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted document");
//   }
// });

/*
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitproject';

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function(){
    client.close();
  });
});

const insertDocuments = function(db, callback){
  db.collection('fruitDB').insertMany([
  {
    name : "Apple1" ,
    score :  8,
    review : "Great fruit"
  },
  {
    name : "Orange1" ,
    score :  6,
    review : "Kinda sour"
  },
  {
    name : "Banana1" ,
    score :  9,
    review : "Great stuff"
  }
],
function(err, r) {
assert.equal(null, err);
assert.equal(3, r.insertedCount);
});
}
*/
