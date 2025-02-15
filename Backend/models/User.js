const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  createrID:{type:mongoose.Schema.Types.ObjectId, ref:"Auth"},
  userID: { type: Number, required: true, unique: true },
  id: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  ventega: { type: String, required: true, enum: ["Yes", "No"] }, 
  parentID: { type: Number, default: null }, 
  childIDs: [{ type: Number, default: [] }], 
});

module.exports = mongoose.model("User", UserSchema);
