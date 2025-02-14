const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true, unique: true },
    age: { type: Number, required: true },
    veteran: { type: Boolean, default: false },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
