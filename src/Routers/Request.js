const express = require("express");
const { authenticateUser } = require("../helper/Validation");
const User = require("../model/User");
const ConnectionRequest = require("../model/connectionReq");
const validator = require("validator");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:UserId",
  authenticateUser,
  async (req, res) => {
    try {
      const fromUserId = req.user._id.toString();
      const toUserId = req.params.UserId;
      const status = req.params.status;
      // console.log(data);
      // console.log(fromUserId);
      // console.log(toUserId);

      // Validate status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not applicable");
      }
      if (!validator.isMongoId(toUserId)) {
        throw new Error("Enter a valid userID");
      }

      const toUserData = await User.findById(toUserId);

      if (!toUserData) {
        throw new Error("User with provided UserId does not exist");
      }

      const requestExist1 = await ConnectionRequest.findOne({
        fromUserId,
        toUserId,
      });
      const requestExist2 = await ConnectionRequest.findOne({
        fromUserId: toUserId,
        toUserId: fromUserId,
      });

      const requestExist = requestExist1 || requestExist2;

      // Create and save the connection request
      if (requestExist) {
        throw new Error("Already exist");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const savedRequest = await connectionRequest.save();

      // Send success response
      res.json({
        message: "Connection request sent successfully",
        data: savedRequest,
      });
    } catch (error) {
      res.status(400).json({
        errorh: error.message,
      });
    }
  }
);

module.exports = requestRouter;
