const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String },
});

const UserModel = mongoose.model("userData", userSchema);
module.exports = { UserModel };
