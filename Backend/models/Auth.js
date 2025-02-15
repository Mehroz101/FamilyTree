const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    userID: { type: Number, required: true, unique: true, trim: true },
    password: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Auth", UserSchema);
