// const { sign } = require("jsonwebtoken
const mongoose = require("mongoose");
const signupSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
  },

  { timestamps: true }
);
const signupModel = mongoose.model("signupData", signupSchema);
module.exports = signupModel;
