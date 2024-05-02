const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const radioSequelize = require("../../database/setup/database");
const  RadioModel  = require("../../database/models/Radio/RadioModel");

const RadioRouter = Router();



//  ***GET REQUESTS***
RadioRouter.get("/byid", async (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const RadioSender = await RadioModel.findOne({ where: { id: id } });
  if (!RadioSender) {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    return;
  }

  res.status(StatusCodes.OK).json({ Radio: RadioSender });
});

RadioRouter.get("/byuserid", async (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

  const userFavorit = await RadioModel.findOne({ where: { userId: userId } });
  if (!userFavorit) {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    return;
  }
  res.status(StatusCodes.OK).json( { userFavorit: userFavorit } );
  
});

RadioRouter.get("/all", async (req, res) => {
  const allRadiosender = await RadioModel.findAll();
  res.status(StatusCodes.OK).json(allRadiosender);
});

//  ***PUT REQUESTS***
RadioRouter.put("/mark", async (req, res) => {
 try {
  const  { id, newIsDone } = req.body;

  await RadioModel.update({ isDone: newIsDone }, { where: { id: id } });

 res.status(StatusCodes.OK).json({ updatedRadioId: id });
 } catch (e) {
  res.status(StatusCodes.BAD_REQUEST).send(e);
}
});

//  ***POST REQUESTS***

RadioRouter.post("/create", async (req, res) => {
  const { newRadiosender, newIsDone, newUserId } = req.body;

  const newRadio = {
    userId: newUserId,
    radioSender: newRadiosender,
    isDone: newIsDone,

  };

  const radio = await RadioModel.create(newRadio);


  res.status(StatusCodes.OK).json({ radio: radio });
});

//  ***DELETE REQUESTS***
RadioRouter.delete("/delete", async (req, res) => {
  const { id } = req.body; 
if (!id) {
  res.status(StatusCodes.BAD_REQUEST).send("userID fehlt");
  return;
}

const deletedProfile = await RadioModel.findOne({ where: { id: id } });

if (!deletedProfile) {
  res.status(StatusCodes.NOT_FOUND).send("Benutzerprofil nicht gefunden");
  return;
}

await deletedProfile.destroy();

res.status(StatusCodes.OK).json({ deletedUserId: id });
});


module.exports = { RadioRouter };
