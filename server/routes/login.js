const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
// const verify = require('../verify');

// login route
router.post("/register", async (req, res) => {
  console.log("Register Called");
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  console.log(req.body);
  let user = await User.findOne({ email });
  if (password.length < 6)
    return res.status(400).json({
      status: 1,
      mssg: "Password length should me more than 6 characters",
    });
  if (name.length < 1)
    return res.status(400).json({
      status: 1,
      mssg: "A name is required!",
    });
  if (user)
    return res.status(400).json({
      status: 1,
      mssg: "User has already been registered, Please use different Email",
    });

  const salt = await bc.genSalt(10);
  const hashed = await bc.hash(req.body.password, salt);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
    date: Date.now(),
  });
  const newUser = await user.save();
  const token = jwt.sign({ _id: newUser._id }, "Secret5399");
  res.json({ user: newUser, token });
});

router.post("/login", async (req, res) => {
  console.log("LOGIN CALLED");
  const { email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (!userExist)
    return res.status(400).json({ status: 1, mssg: "User does not exists" });
  const validPassword = await bc.compare(password, userExist.password);
  if (!validPassword)
    return res
      .status(500)
      .json({ status: 1, mssg: "Wrong Password, please try again" });
  console.log(req.body);
  const token = jwt.sign({ _id: userExist._id }, "Secret5399");
  return res.json({ token, user: userExist });
});

router.post("/logout", async (req, res) => {
  console.log("LOGOUT CALLED");
  const { token } = req.body;
  const decoded = jwt.verify(token, "Secret5399");
  const user = await User.findById(decoded._id);
  if (!user)
    return res.status(400).json({ status: 1, mssg: "User does not exists" });
  return res.json({ status: 0, mssg: "Logged out successfully" });
});

module.exports = router;
