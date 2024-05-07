const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AppRouter } = require("./src/routes");
const radioSequelize = require("./src/database/setup/database");
const logger = require('./src/services/logger/logger'); // Passe den Pfad entsprechend an

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use(cors());

radioSequelize
  .sync()
  .then(() => {
    console.log("DB has been success");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/v1", AppRouter);

app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
