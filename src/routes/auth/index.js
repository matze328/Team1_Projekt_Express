const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../database/models/User/UserModel");
const radioSequelize = require("../../database/setup/database");
const { createAccessToken } = require("../../services/auth/AccessToken");
const AuthRouter = Router();
//  ***GET REQUESTS***
AuthRouter.get("/login", async (req, res) => {
  const { email, password } = req.query;
  const user = await UserModel.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).send("email oder password falsch");
  }
  if (user.password !== password) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("email oder password falsch");
  }
  const accessToken = createAccessToken(user.userId);
  res.json({ accessToken, user });
});
//  ***POST REQUESTS***
AuthRouter.post("/signup", async (req, res) => {
  const { newUserName, newVorName, newNachName, newEmail, newPassword } =
    req.body;
  const newProfile = {
    userName: newUserName,
    vorName: newVorName,
    nachName: newNachName,
    email: newEmail,
    password: newPassword,
  };
  const profile = await UserModel.create(newProfile);
  const accessToken = createAccessToken(profile.userId);
  res.json({ accessToken });
});
//  ***DELETE REQUESTS***
AuthRouter.delete("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Logout fehlgeschlagen");
      }
      res.clearCookie("sessionID");
      res.status(StatusCodes.OK).send("Logout erfolgreich");
    });
  } else {
    res.status(StatusCodes.OK).send("Keine aktive Sitzung zum Abmelden");
  }
});
module.exports = { AuthRouter };
