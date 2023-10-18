const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ message: "User already exist" });
    }

    let hashPassword = bcrypt.hashSync(password, 5);
    const newuser = new UserModel({ name, email, password: hashPassword });
    await newuser.save();
    return res.status(200).json({ message: "user registerd successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(201).json({ message: "Please register first" });
    }
    let passcheck = bcrypt.compareSync(password, user.password);
    if (!passcheck) {
      return res.status(201).json({ message: "Invalid credential" });
    }
    payload = { userId: user._id, username: user.name };
    let token = jwt.sign(payload, process.env.secreteKey, { expiresIn: "8h" });
    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = { userRouter };
