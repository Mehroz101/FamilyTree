const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  veteran: { type: Boolean, default: false },
  childID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to Child Users
});

module.exports = mongoose.model("User", UserSchema);
