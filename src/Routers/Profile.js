const express = require("express");
const ProfileRouter = express.Router();
const { authenticateUser } = require("../helper/Validation");

ProfileRouter.get("/profile/view", authenticateUser, async (req, res) => {
  try {
    const profile = req.user;
    const shareableData = {
      username: profile.username,
      fullname: profile.fullname,
      email: profile.email,
      gender: profile.gender,
      about: profile.about,
      gender: profile.gender,
      country: profile.country,
    };
    res.status(200).json(shareableData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = ProfileRouter;
