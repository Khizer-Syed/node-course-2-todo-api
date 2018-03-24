const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {ObjectId} = require('mongodb');
const {User} = require('./../Server/models/user');

// Remove All
// Todo.remove({}).then((res) => {
//   console.log(res);
// });

//findOneAndRemove()
//findByIdAndRemove()
Todo.findOneAndRemove({
  _id : '5ab60dfb58c23a3560cc1386'
}).then((todo) => {
  console.log(todo);
});
