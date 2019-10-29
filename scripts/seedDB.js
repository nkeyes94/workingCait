const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/heroku_tmwk490b"
);

const todoSeed = [{
    todoName: "Set up server",
    todoDescription: "connect client and server",
    date: new Date(Date.now())
  },
  {
    todoName: "set up mongodb connection",
    todoDescription: "text connection with example todo list",
    date: new Date(Date.now())
  },
  {
    todoName: "Deploy to heroku",
    todoDescription: "get c.a.i.t deployed",
    date: new Date(Date.now())
  },
];

db.Todo
  .remove({})
  .then(() => db.Todo.collection.insertMany(todoSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });