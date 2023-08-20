const express = require("express");
const router = express.Router();
require("dotenv").config();
const CartModel = require("../models/Cart/cart.model");
(function sync() {
  CartModel.sync({
    alter: true,
  });
})();

router.get("/get", (req, res) => {
  return res.json({ resposne: "nice" });
});

module.exports = router;
