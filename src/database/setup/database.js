const { Sequelize } = require("sequelize");
const AWS = require('aws-sdk');

// Connect to MySQL using Sequelize
const radioSequelize = new Sequelize("radio_app", "root", "root1234", {
  host: "localhost",
  dialect: "mysql",
});

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = { radioSequelize, dynamoDb };
