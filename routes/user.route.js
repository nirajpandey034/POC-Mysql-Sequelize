/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const random = require("random-string-alphanumeric-generator");

const UserModel = require("../models/Users/user.model");
const {
  addUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../models/Users/user.controller");

(function sync() {
  UserModel.sync({
    alter: true,
  });
})();

const createReference = () => {
  return random.randomHex(6).toUpperCase();
};
router.post("/register", async (req, res) => {
  try {
    // getting input
    const { firstName, lastName, email, password } = req.body;

    //validation
    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("All input is required");
    }
    //checking existing user
    const oldUser = await getSingleUser(email);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await addUser({
      firstName,
      lastName,
      email: email,
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });

    // return new user
    return res
      .status(201)
      .json({ token: token, success: true, reference: createReference() });
  } catch (err) {
    return res.status(500).json({ error: err, success: false });
  }
});
router.post("/login", async (req, res) => {
  try {
    // getting input
    const { email, password } = req.body;

    //validation
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // getting password from db and comparing it
    const user = await getSingleUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });
      // send response
      return res.status(200).json({
        token: token,
        success: true,
        user: `${user.firstName} ${user.lastName}`,
        reference: createReference(),
      });
    }
    return res.status(400).json({ success: false });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const data = await getUsers();
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
