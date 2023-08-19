const express = require("express");
const router = express.Router();
require("dotenv").config();

const UserModel = require("../models/Users/user.model");
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../models/Users/user.controller");

(function sync() {
  UserModel.sync({
    alter: true,
  });
})();
router.get("/getAll", async (req, res) => {
  try {
    const data = await getUsers();
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = await addUser(req.body);
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});

router.put("/update", async (req, res) => {
  try {
    const data = await updateUser({ data: req.body, email: req.body.email });
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const data = await deleteUser(req.body.email);
    return res.json({ status: "success", result: data });
  } catch (err) {
    return res.json({ status: "failed", reason: err });
  }
});
module.exports = router;
