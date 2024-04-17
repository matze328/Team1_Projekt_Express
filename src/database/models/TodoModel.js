const { DataTypes } = require("sequelize");
const todoSequelize = require("../setup/database");

// Define the Todo model
const TodoModel = todoSequelize.define(
  "Todo",
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

module.exports = TodoModel;
