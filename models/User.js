const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//using mongoose to connect with the data store
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = User = mongoose.model("users", UserSchema);