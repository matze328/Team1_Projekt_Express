const { Sequelize } = require("sequelize");

// Connect to MySQL using Sequelize
const radioSequelize = new Sequelize("radio_app", "root", "root1234", {
  host: "team-1.ccx8cspeoixx.eu-central-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = radioSequelize;
