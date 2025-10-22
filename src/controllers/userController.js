const User = require("../models/user");

exports.getUserProfile=async(req,res)=>{
    
    try{
        const userProfile=await User.findById(req.userId)
        console.log(userProfile)
        res.json(userProfile)
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}