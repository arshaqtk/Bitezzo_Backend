const User = require("../models/user");

exports.getUserProfile=async(req,res)=>{
    
   
        const userProfile=await User.findById(req.userId)
        res.json(userProfile) 
   
}  


