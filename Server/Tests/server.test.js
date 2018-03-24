const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');
const {app} = require('./../Server');
const {Todo} = require('./../models/todo');
const todos = [
  {
    _id : new ObjectId(),
    text : 'First test todo'
  },{
    _id : new ObjectId(),
    text : 'Second test todo',
    completed : true,
    completedAt : 44
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});
describe('POST /todos', () => {
  it('should create new todo', (done) => {
    var text = 'Todo test text';
    request(app).
    post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    }).end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with bad data', (done) => {
    request(app)
    .post('/todos')
    .send({text : ''})
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
});
});

describe('GET /todos/:id', () => {
  it('should get todos by Id',(done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 for todo not found', (done) => {
    var id = new ObjectId().toHexString();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for invalid ObjectId', (done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

  describe('DELETE /todos',() => {
    it(`should delete todo`, (done) => {
      var hexId = todos[0]._id.toHexString();
      request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
    });

    it(`should return 401 for invalid ObjectId`, (done) => {
      request(app)
      .delete('/todos/123')
      .expect(401)
      .end(done);
    });

    it(`should return 404 for todo not found`, (done) => {
      var id = new ObjectId().toHexString();
      request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
    });
  });

describe('PATCH /todos', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'First Test Completed';
    var completed = true;
    request(app)
    .patch(`/todos/${id}`)
    .send({text, completed})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(completed);
      expect(res.body.todo.completedAt).toBeA('number');
    }).end((err, res) => {
      if (err) return done(err);
      Todo.findById(id).then((todo) => {
        expect(todo.text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it(`should clear completedAt when completed is false`, (done) => {
    var id = todos[1]._id.toHexString();
    var completed = false;
    request(app)
    .patch(`/todos/${id}`)
    .send({completed})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(completed);
      expect(res.body.todo.completedAt).toNotExist();
    }).end((err, res) => {
      if (err) return done(err);
      Todo.findById(id).then((todo) => {
        expect(todo.completedAt).toBe(null);
        done();
      }).catch((e) => done(e));
    });
  });
});
