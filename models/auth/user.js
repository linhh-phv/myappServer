const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
  role: {
    type: String,
    default: "user",
  },
  accessToken: {
    type: String,
    require: true,
  },
  dateActive: {
    type: Date,
    require: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
