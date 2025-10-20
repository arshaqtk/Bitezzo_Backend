const express = require("express")
const router = express.Router();
const User = require("../models/user");
const { signupValidator } = require("../middlewares/validation")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")



router.post("/signup", signupValidator, async (req, res) => {
    try {
        const { username, email, password } = req.body
        const HashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: HashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isValidEmail = await bcrypt.compare(password, user.password)
        if(!isValidEmail){
            throw new Error("Invalid Credentials")
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token",token)
        res.send("user logined", user)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


module.exports = router