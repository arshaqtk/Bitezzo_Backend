const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true,minLength:4 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    avatar: { type: String },
    isAuthenticated: { type: Boolean, default: true },
    isAdmin:{type:Boolean,default:false},
     refreshToken: { type: String,default: null}
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
