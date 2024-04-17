const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const todoSequelize = require("../../database/setup/database");
const TodoModel = require("../../database/models/TodoModel");

const RadioRouter = Router();

let todos = [
  {
    id: 1,
    userId: 1,
    radioSender: "Last FM",
  },
  {
    id: 2,
    userId: 1,
    radioSender: "Sunshine Live",
  },
  {
    id: 3,
    userId: 2,
    radioSender: "1 Live",
  },
  {
    id: 4,
    userId: 2,
    radioSender: "Radio 91,10",
  },
];

// GET REQUESTS
// /v1/todos/bytodoid
RadioRouter.get("/byid", (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = todos.find((item) => item.id == todoId);
  // 1 == '1' --> true
  // 1 === '1' --> false
  res.status(StatusCodes.OK).json({ todo: todo });
});

// Alle Todos von einer UserId
RadioRouter.get("/byuserid", (req, res) => {
  // const userId = req.body.userId;
  // const userId = parseInt(req.query.userId);
  const userId = req.query.userId;
  console.log(userId);

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Keine userID");
    return;
  }

  const userTodos = todos.filter((todo) => todo.userId == userId);

  res.status(StatusCodes.OK).json(userTodos);
  // res.status(StatusCodes.OK).send(JSON.stringify(userTodos)); //alternativ
});

RadioRouter.get("/all", (req, res) => {
  res.status(StatusCodes.OK).send(todos);
});

// PUT REQUESTS
RadioRouter.put("/mark", (req, res) => {
  const { id, newIsDone } = req.body;

  const todo = todos.find((item) => item.id == id);

  // setzt das zuvor definierte todo auf den neuen isDone WErt
  todo.isDone = newIsDone;

  // Todo rauslöschen
  const newTodos = todos.filter((item) => item.id != id);

  // Geupdatete Todo wieder hinzufügen
  newTodos.push(todo);

  todos = newTodos;

  res.status(StatusCodes.OK).json({ updatedTodo: todo });
});

RadioRouter.put("/update", (req, res) => {
  const { todoId, newTask, newIsDone, newDueDate } = req.body;

  const todo = todos.find((todo) => todo.id == todoId);

  // wir überschreiben bestimmte Werte des Todos
  todo.task = newTask;
  todo.isDone = newIsDone;
  todo.dueDate = new Date(newDueDate);

  // // Todo rauslöschen
  // const newTodos = todos.filter((todo) => todo.id != todoId);

  // // Geupdatete Todo wieder hinzufügen
  // newTodos.push(todo);

  // todos = newTodos;

  console.log(todos);

  res.status(StatusCodes.OK).json({ updatedTodo: todo });
});

// POST REQUESTS
RadioRouter.post("/create", async (req, res) => {
  const { newTask, newIsDone, newDueDate, newUserId } = req.body;

  const newTodo = {
    task: newTask,
    isDone: newIsDone,
    dueDate: new Date(newDueDate),
    userId: newUserId,
  };

  const todo = await TodoModel.create(newTodo);

  // todos.push(newTodo);

  res.status(StatusCodes.OK).json({ todo });
});

// DELETE REQUEST
RadioRouter.delete("/delete", (req, res) => {
  const { todoId } = req.body; //req.body.todoId

  console.log("MY BODY", req.body);
  const newTodosArray = todos.filter((item) => item.id != todoId);

  console.log("NEW TODOS", newTodosArray);
  todos = newTodosArray;
  res.status(StatusCodes.OK).json({ deletedTodosId: todoId });
});

module.exports = { RadioRouter };
