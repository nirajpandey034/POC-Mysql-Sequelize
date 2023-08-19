const express = require("express");
const router = express.Router();
require("dotenv").config();

const ProductModel = require("../models/Products/product.model");
const {
  addProduct,
  getProducts,
} = require("../models/Products/product.controller");

(function sync() {
  ProductModel.sync({
    alter: true,
  });
})();
router.get("/getAll", async (req, res) => {
  try {
    const data = await getProducts();
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = await addProduct(req.body);
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});
module.exports = router;
