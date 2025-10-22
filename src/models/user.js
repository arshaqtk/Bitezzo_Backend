const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,minLength:4 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    image: { type: String },
    isAuthenticated: { type: Boolean, default: true }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
