// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

var todos = [
  { id: 1, todo: "Đi chợ" },
  { id: 2, todo: "Nấu cơm" },
  { id: 3, todo: "Rửa chén" },
  { id: 4, todo: "Học CoderX" }
];

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});
app.get("/todos", (request, response) => {
  response.render("todos", { todos: todos });
});

app.get("/todos/search", (request, response) => {
  var q = request.query.q;
  var matchedTodos = todos.filter(
    todo => todo.todo.toUpperCase().indexOf(q.toUpperCase()) !== -1
  );
  response.render("todos", { todos: matchedTodos });
});

app.post("/todos/create",(req,res)=>{
  todos.push(req.body);
  res.redirect('/todos');
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
