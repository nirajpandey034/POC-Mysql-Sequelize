/* eslint-disable no-undef */
require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.SHOP_DB_NAME,
  process.env.SHOP_DB_USER,
  process.env.SHOP_DB_PASSWORD,
  {
    host: process.env.SHOP_DB_HOST,
    dialect: process.env.SHOP_DB_DIALECT || "mysql",
  }
);

(async function DBConnection() {
  try {
    await sequelize.authenticate();
    console.log(`Connection Success to ${process.env.SHOP_DB_NAME}`);
  } catch (err) {
    console.log("Error Occured", err);
  }
})(); // intializing DB connection
module.exports = sequelize;
