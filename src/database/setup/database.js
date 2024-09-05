const { Sequelize } = require("sequelize");
const AWS = require('aws-sdk');

// Connect to MySQL using Sequelize
const radioSequelize = new Sequelize("radio_app", "root", "root1234", {
  host: "localhost",
  dialect: "mysql",
});



module.exports = radioSequelize 

