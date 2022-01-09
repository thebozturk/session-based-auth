const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  full_name: String,
  email: String,
  password: String,
});

const User = Mongoose.model("User", UserSchema);
module.exports = { User };
