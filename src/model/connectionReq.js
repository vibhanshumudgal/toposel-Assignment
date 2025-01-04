const mongoose = require("mongoose");
const User = require("./User")
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected", "interested"],
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    collection: "ConnectionRequests", // Optional collection name
  }
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
