const express = require("express")
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

exports.signup= async (req, res) => {
    try {
        const { name, email, password } = req.body
        const HashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username:name, email, password: HashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
         console.error("Signup Error:", err);
        res.status(400).json({ message: err.message });
    }
}

exports.login= async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAuthenticated:user.isAuthenticated
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}