const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const age = new Date().getFullYear() - value.getFullYear();
          return age >= 9 && age <= 90;
        },
        message: "Age must be between 9 and 90 years",
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      minlength: [2, "Country must be at least 2 characters long"],
      maxlength: [50, "Country cannot exceed 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: validator.isStrongPassword,
        message: "Password must be strong (min length 8, include uppercase, lowercase, number, and symbol)",
      },
    },
    about: {
      type: String,
      default: "New to the app",
      trim: true,
      maxlength: [40, "About section cannot exceed 40 characters"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      lowercase: true,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be either 'male', 'female', or 'other'",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "UserInfo",
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
