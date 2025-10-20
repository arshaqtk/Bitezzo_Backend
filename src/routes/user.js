const express = require("express")
const router = express.Router();
const User = require("../models/user");
const jwt=require("jsonwebtoken");
const tokenAuthentication = require("../middlewares/authMiddleware");

router.get("/profile",tokenAuthentication,async(req,res)=>{
    
    try{
        const userId=req.user._id
        const userProfile=await User.findById(userId)
        res.json(userProfile)
    }catch(err){
        res.status(400).json({ message: err.message });
    }
})

module.exports=router