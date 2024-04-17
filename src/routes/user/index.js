const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Datenbank simulieren
let profiles = [
  {
    userId: 1,
    userName:"jane",
    vorName: "Max",
    nachName: "julihihi",
    email: "Mustermann@aol.com",
    password: "testing",
  },
  {
    userId: 2,
    userName:"joe",
    vorName: "joe",
    nachName: "Dosermann",
    email: "joeDosermann@aol.com",
    password: "tasting",
  },
  {
    userId: 3,
    userName:"bob",
    vorName: "Boby",
    nachName: "Lando",
    email: "Boby.Lando@aol.com",
    password: "teasting",
  },
  {
    userId:  4,
    userName:"bean",
    vorName: "Bär",
    nachName: "Mann",
    email: "Bär.Mann@aol.com",
    password: "toasting",
  },
];

const UserRouter = Router();

//  ***GET REQUESTS***
//Return all profiles
UserRouter.get("/profile/all", (req, res) => {
  res.status(StatusCodes.OK).json(profiles);
});

// Return profile from a specific user
UserRouter.get("/profile/byid", (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const userProfile = profiles.find((profiles) => profiles.userId === userId);
  res.status(StatusCodes.OK).json({ profiles: userProfile });
});

//  ***PUT REQUESTS***
UserRouter.put("/profile/update", (req, res) => {
  // req.body = {
  //   userId: 2,
  //   username: "Franz",
  // };

  // const username = req.body.username;
  // const userId = req.body.userId;

  // wir holen Input aus dem Request heraus
  const { username, userId } = req.body;

  if (!userId || !username) {
    res.status(StatusCodes.BAD_REQUEST).send("userID oder username fehlt");
  } else {
    // finde das Profil mit passender ID
    const currentUser = profiles.find((item) => item.id === userId);
    // aktualisiere Profil-username
    currentUser.username = username;

    // hole alle anderen Profile aus der Datenbank
    const newProfiles = profiles.filter((item) => item.id !== userId);
    // füge das bearbeitete Profil diesem Array hinzu
    newProfiles.push(currentUser);
    // => aktualisierten Array der gesamten Datenbank

    // Datenbank durch aktualisierte Version ersetzen
    profiles = newProfiles;

    res.statusCode(StatusCodes.OK).json({ updatedProfile: currentUser });
  }
});

//  ***DELETE REQUESTS***
UserRouter.delete("/profile", (req, res) => {
  const { userId } = req.body;

  const deletedProfiles = profiles.filter((item) => item.id !== userId);
  profiles = deletedProfiles;

  res.json({ deletedUserId: userId });
});

module.exports = { UserRouter };
