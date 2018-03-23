//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log(`Unable to connect to database: ${err}`);
  }
  console.log(`Connected to MongoDB server`);
  const db = client.db('TodoApp');
  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5ab490fef81cbe10aadfc5a0")
  // },{
  //   $set : {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal : false
  // }).then((res) => {
  //   console.log(res);
  // });

  db.collection('users').findOneAndUpdate({
    _id: new ObjectID("5ab4805731d7da1e18ee3359")
  },{
    $set : {
     name : 'Khizer Syed'
   },
   $inc : {
     age : -1
   }
  }, {
    returnOriginal : false
  }).then((res) => {
    console.log(res);
  });
  //client.close;

});
