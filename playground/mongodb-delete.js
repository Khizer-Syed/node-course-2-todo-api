//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log(`Unable to connect to database: ${err}`);
  }
  console.log(`Connected to MongoDB server`);
  const db = client.db('TodoApp');
  //deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Eat Lunch'
  // }).then((result) => {
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  //findOneAndDelete

  db.collection('users').findOneAndDelete({_id : new ObjectID("5ab482f496fcb81a483691c3")}).then((result) => {
    console.log(result);
  })
  //client.close;

});
