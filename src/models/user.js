const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,minLength:4 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    image: { type: String },
    isAuthenticated: { type: Boolean, default: true },
     refreshToken: { type: String,default: null}
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
