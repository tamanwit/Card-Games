const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }, 
  profile_picture: {
    type: String,
  },
});

const userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;
