const { DataTypes } = require("sequelize");
const radioSequelize = require("../../setup/database");

// Define the Todo model
const RadioModel = radioSequelize.define(
  "Radios",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    radioSender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "RadioSender" }
);

module.exports = RadioModel;
