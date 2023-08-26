const express = require("express");
const router = express.Router();
require("dotenv").config();
const auth = require("../middleware/auth");

const { clearCart } = require("../models/Cart/cart.controller");

router.post("/", auth, async (req, res) => {
  const id = req.body.reference;

  try {
    const response = await clearCart(id);
    return res.json({ status: "success", result: response });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

module.exports = router;
