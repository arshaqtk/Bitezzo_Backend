const User = require("../models/user");
const Orders = require("../models/orders")
const Wishlist = require("../models/wishlist");
const { default: mongoose } = require("mongoose");

exports.getUserProfile=async(req,res)=>{
        const userProfile=await User.findById(req.user._id)
        return res.json(userProfile) 
}  

exports.editUserProfileImage=async(req,res)=>{
        const image=req.file.path
        const userProfile=await User.findByIdAndUpdate(req.user._id,{avatar:image},{new:true})
        
        return res.status(200).json({success:true,message: 'user updated successfully', userProfile})
}

exports.userProfileStats=async(req,res)=>{
        const userId=req.user._id
        console.log(userId)
        const wishlistCount=await Wishlist.countDocuments({wishlistBy:userId})
        const orderCount=await Orders.countDocuments({orderBy:userId})
        const totalSpent=await Orders.aggregate([
                {$match:{orderBy:new mongoose.Types.ObjectId(userId)}},
                {$group:{_id:null,total:{$sum:"$total"}}}])
        const loyaltyPoint=orderCount*100

        return res.status(200).json({success:true,totalOrders: orderCount,favoriteItems: wishlistCount,totalSpent:totalSpent[0]?.total,loyaltyPoint})
}

exports.userNavStats=async(req,res)=>{
        const userId=req.user._id
        const wishlistCount=await Wishlist.countDocuments({wishlistBy:userId})
        const cartCount=await Orders.countDocuments({cartBy:userId})
        return res.status(200).json({success:true,wishlistCount,cartCount})
}
