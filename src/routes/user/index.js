const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const radioSequelize = require("../../database/setup/database");
const UserModel = require("../../database/models/User/UserModel.js");

const UserRouter = Router();

//  ***GET REQUESTS***

UserRouter.get("/all", async (req, res) => {
  const allProfiles = await UserModel.findAll();
  res.status(StatusCodes.OK).json(allProfiles);
});

UserRouter.get("/currrentuser", async (req, res) => {
  const userId = parseInt(req.userId);
  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const userProfile = await UserModel.findOne({ where: { userId: userId } });

  if (!userProfile) {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    return;
  }

  res.status(StatusCodes.OK).json({ profile: userProfile });
});

//  ***PUT REQUESTS***
UserRouter.put("/update", async (req, res) => {
  const { userName, userId, vorName, nachName, email, password } = req.body;

  if (!userId || !userName || !vorName || !nachName || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send("userID oder username fehlt");
    return;
  }

  const currentUser = await UserModel.findOne({ where: { userId: userId } });

  if (!currentUser) {
    res.status(StatusCodes.NOT_FOUND).send("Benutzerprofil nicht gefunden");
    return;
  }

  currentUser.userName = userName;
  currentUser.vorName = vorName;
  currentUser.nachName = nachName;
  currentUser.email = email;
  currentUser.password = password;

  await currentUser.save();

  res.status(StatusCodes.OK).json({ updatedProfile: currentUser });
});

//  ***DELETE REQUESTS***
UserRouter.delete("/delete", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send("userID fehlt");
    return;
  }

  const deletedProfile = await UserModel.findOne({ where: { userId: userId } });

  if (!deletedProfile) {
    res.status(StatusCodes.NOT_FOUND).send("Benutzerprofil nicht gefunden");
    return;
  }

  await deletedProfile.destroy();

  res.status(StatusCodes.OK).json({ deletedUserId: userId });
});

module.exports = { UserRouter };
