const { DataTypes } = require("sequelize");
const radioSequelize = require("../../setup/database");

// Define the Todo model
const RadioModel = radioSequelize.define(
  "Radio",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    radioSender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "RadioSender" }
);

module.exports = RadioModel;
