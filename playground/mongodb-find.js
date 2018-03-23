//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log(`Unable to connect to database: ${err}`);
  }
  console.log(`Connected to MongoDB server`);
  const db = client.db('TodoApp');
  db.collection('users').find({
    name : 'Khizer'
  }).toArray().then((users) => {
    console.log(`Users`);
    console.log(JSON.stringify(users, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos',err);
  })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count ${count}`);
  // }, (err) => {
  //   console.log('Unable to count todos',err);
  // })
  //client.close;

});
