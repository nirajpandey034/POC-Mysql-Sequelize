const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../middleware/auth");
const CartModel = require("../models/Cart/cart.model");
const {
  addToCart,
  clearCart,
  getCart,
} = require("../models/Cart/cart.controller");

(function sync() {
  CartModel.sync({
    alter: true,
  });
})();

router.post("/get", auth, async (req, res) => {
  try {
    const response = await getCart(req.body.reference);
    return res.json({ status: "success", result: response });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

// to be used for new cart creation as well as for existing cart update
router.post("/add", auth, async (req, res) => {
  const { productList, user, reference } = req.body;
  let totalCartValue = 0;
  JSON.parse(productList).map((item) => {
    totalCartValue += item.price;
  });
  const cartObject = {
    items: productList,
    user,
    id: reference,
    pricing: totalCartValue,
  };
  try {
    const data = await addToCart(cartObject);
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

router.delete("/clear", auth, async (req, res) => {
  try {
    const data = await clearCart(req.body.reference);
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

module.exports = router;
