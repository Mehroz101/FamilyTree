const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  id:{type: Number, required: true},
  veteran: { type: Boolean, default: false },
  parentID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to parent
});

module.exports = mongoose.model("Child", ChildSchema);
