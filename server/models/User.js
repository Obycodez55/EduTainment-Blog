const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Interests: {
    type: Array
  },
  joinedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", UserSchema);
