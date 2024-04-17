const { DataTypes } = require("sequelize");
const todoSequelize = require("../setup/database");

// Define the Todo model
const UserModel = todoSequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vorname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nachname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  { tableName: "User" }
);

module.exports = UserModel;
