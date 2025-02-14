const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const AuthRouter = express.Router();

AuthRouter.post("/singup", async (req, res) => {
  try {
    const { username, fullName, email, dateOfBirth, country, password, about, gender } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      fullName,
      email,
      dateOfBirth,
      country,
      password: hashedPassword,
      about,
      gender,
    });

    const result = await newUser.save();
    res.status(201).json("Congratulations you singup succesfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ _id: user._id }, "backendUser", { expiresIn: "8h" });

    res.cookie("token", token, {
      secure: true,
      maxAge: 3600000, // 1 hour
    });

    res.status(200).send("Welcome back");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

AuthRouter.delete("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = AuthRouter;
