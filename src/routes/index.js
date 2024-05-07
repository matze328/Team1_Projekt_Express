const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./user");
const { RadioRouter } = require("./radio");
const logger = require("../services/logger/logger");
const authMiddleWare = require("../middlewares/authMiddleware");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/user", authMiddleWare, UserRouter);
AppRouter.use("/radio", RadioRouter);

module.exports = { AppRouter };
