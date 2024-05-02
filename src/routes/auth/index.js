const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../database/models/User/UserModel")
const radioSequelize = require("../../database/setup/database");

const AuthRouter = Router();

//  ***GET REQUESTS***
AuthRouter.get("/login", async(req, res) => {
  const { email, password } = req.query;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).send("email oder password falsch");

  }
  console.log("hallo",user)
  if (user.password !== password) {
    return res.status(StatusCodes.UNAUTHORIZED).send("email oder password falsch");
  }
  res.status(StatusCodes.OK).json({user});
});

//  ***POST REQUESTS***

AuthRouter.post("/signup", async(req, res) => {
  const { newUserName, newVorName, newNachName, newEmail, newPassword } = req.body;
  const newProfile = {
    userName: newUserName,
    vorName: newVorName,
    nachName: newNachName,
    email: newEmail,
    password: newPassword,
  };

  const profile = await UserModel.create(newProfile);

  res.status(StatusCodes.OK).json({ profile: profile });
});

//  ***DELETE REQUESTS***
AuthRouter.delete("/logout", async (req, res) => {
  if (req.session) {
   
    req.session.destroy((err) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Logout fehlgeschlagen");
      }
      res.clearCookie("sessionID");
      res.status(StatusCodes.OK).send("Logout erfolgreich");
    });
  } else {
    res.status(StatusCodes.OK).send("Keine aktive Sitzung zum Abmelden");
  }
});




module.exports = { AuthRouter };
