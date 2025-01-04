const express = require("express");
const { authenticateUser } = require("../helper/Validation");
const connectionReq = require("../model/connectionReq");

const UserReqRouter = express.Router();

// Example route for getting user information
UserReqRouter.get(
  "/user/request/review",
  authenticateUser,
  async (req, res) => {
    try {
      const userid = req.user._id;
      const data = await connectionReq
        .find({
          toUserId: userid,
          status: "intrested",
        })
        .populate("fromUserId",["name","email","age","about","gender"]);
      res.send(data);
    } catch (error) {
      res.sendStatus(400);
    }
  }
);

module.exports = UserReqRouter;
