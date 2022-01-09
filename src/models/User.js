const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
});

module.exports = Mongoose.model("User", UserSchema);
