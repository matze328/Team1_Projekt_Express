const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const radioSequelize = require("../../database/setup/database");
const RadioModel = require("../../database/models/Radio/RadioModel");

const RadioRouter = Router();

let radios = [
  {
    id: 1,
    userId: 1,
    radioSender: "Last FM",
    isDone: true,
  },
  {
    id: 2,
    userId: 1,
    radioSender: "Sunshine Live",
    isDone: true,
  },
  {
    id: 3,
    userId: 2,
    radioSender: "1 Live",
    isDone: true,
  },
  {
    id: 4,
    userId: 2,
    radioSender: "Radio 91,10",
    isDone: true,
  },
];

// GET REQUESTS
// /v1/todos/bytodoid
RadioRouter.get("/byid", (req, res) => {
  const radioId = req.query.id;
  if (!radioId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const Radio = radios.find((item) => item.id == radioId);
  // 1 == '1' --> true
  // 1 === '1' --> false
  res.status(StatusCodes.OK).json({ Radio: Radio });
});

// Alle Todos von einer UserId
RadioRouter.get("/byuserid", (req, res) => {
  // const userId = req.body.userId;
  // const userId = parseInt(req.query.userId);
  const userId = req.query.userId;
  // console.log(userId);

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Keine userID");
    return;
  }

  const userRadio = radios.filter((item) => item.userId == userId);

  res.status(StatusCodes.OK).json(userRadio);
  // res.status(StatusCodes.OK).send(JSON.stringify(userTodos)); //alternativ
});

RadioRouter.get("/all", (req, res) => {
  res.status(StatusCodes.OK).send(radios);
});

// PUT REQUESTS
RadioRouter.put("/mark", (req, res) => {
  const { id, newIsDone } = req.body;

  const radio = radios.find((item) => item.id == id);

  // setzt das zuvor definierte todo auf den neuen isDone WErt
  radio.isDone = newIsDone;

  // Todo rauslöschen
  const newRadios = radios.filter((item) => item.id != id);

  // Geupdatete Todo wieder hinzufügen
  newRadios.push(radio);

  radios = newRadios;

  res.status(StatusCodes.OK).json({ updatedRadio: radio });
});

// RadioRouter.put("/update", (req, res) => {
//   const { id, newTask, newIsDone, newDueDate } = req.body;

//   const radio = radios.find((radioSender) => radios.id == id);

//    -----wir überschreiben bestimmte Werte des Todos-----
//   todo.task = newTask;
//   todo.isDone = newIsDone;
//   todo.dueDate = new Date(newDueDate);


//   console.log(todos);

//   res.status(StatusCodes.OK).json({ updatedTodo: todo });
// });

// POST REQUESTS
RadioRouter.post("/create", async (req, res) => {
  const { newRadiosender, newIsDone, newId, newUserId } = req.body;

  const newRadio = {
    // id: newId,
    userId: newUserId,
    radioSender: newRadiosender,
    isDone: newIsDone,

  };

  const radio = await RadioModel.create(newRadio);

  // radios.push(newRadio);

  res.status(StatusCodes.OK).json({ radio: radio });
});

// DELETE REQUEST
RadioRouter.delete("/delete", (req, res) => {
  const { id } = req.body; //req.body.todoId

  console.log("MY BODY", req.body);
  const newRadiosArray = radios.filter((item) => item.id != id);

  console.log("NEW TODOS", newRadiosArray);
  radios = newRadiosArray;
  res.status(StatusCodes.OK).json({ deletedid: id });
});

module.exports = { RadioRouter };
