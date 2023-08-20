const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  items: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricing: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Cart;
