const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  createrID:{type:mongoose.Schema.Types.ObjectId, ref:"Auth"},
  userID: { type: Number, required: true, unique: true }, // Auto-incremented manually
  id: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  ventega: { type: String, required: true, enum: ["Yes", "No"] }, // Ensures only "Yes" or "No"
  parentID: { type: Number, default: null }, // Parent's userID (null if top-level)
  childIDs: [{ type: Number, default: [] }], // Array of child userIDs
});

module.exports = mongoose.model("User", UserSchema);
