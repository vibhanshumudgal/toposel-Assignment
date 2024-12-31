const express = require("express");
const AuthRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");
const validator = require("validator");
const jwt = require("jsonwebtoken");

AuthRouter.post("/singup", async (req, res) => {
  try {
    // validate_all_data(raw_data);
    const { name, email, age, password, about, gender } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    const data = new User({
      name,
      email,
      age,
      password: hashedPassword,
      about,
      gender,
    });
    // console.log(data);
    const result = await data.save();
    res.send(result);
  } catch (error) {
    res.send("error  " + error.message);
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Please provide correct email");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("the emial not present");
    }
    const password_matching = await bcrypt.compare(password, user.password);

    if (!password_matching) {
      throw new Error("Plz chech tha password");
    }
    const token = jwt.sign({ _id: user._id }, "backendUser", {
      expiresIn: "8hr",
    });
    // console.log(token);
    res.cookie("token", token, {
      secure: true,
      maxAge: 360000,
    });
    res.send("Hi");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = AuthRouter;
