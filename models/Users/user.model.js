const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
