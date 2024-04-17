const { DataTypes } = require("sequelize");
const radioSequelize = require("../../setup/database");

// Define the Todo model
const UserModel = radioSequelize.define(
  "Profiles",
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
  { tableName: "User Profiles" }
);

module.exports = UserModel;
