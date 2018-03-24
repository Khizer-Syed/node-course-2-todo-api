const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {ObjectId} = require('mongodb');
const {User} = require('./../Server/models/user');
var id = '5ab54304890e240df83eb58';
var uid = '5ab4a212931a610a44d6f66911';
if (!ObjectId.isValid(uid)) console.log('Id not valid');
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos' ,todos);
// });
//
// Todo.findOne({
//   _id : id
// }).then((todo) => {
//   console.log(`Todo : ${todo}`);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) return console.log('Id not found');
//   console.log(`Todo by Id : ${todo}`);
// }).catch((e) => console.log(e));

User.findById({
  _id : uid
}).then((user) => {
  if (!user) return console.log('User Not Found');
  console.log('User', user);
}).catch((e) => console.log(e));
