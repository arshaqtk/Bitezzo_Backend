const express = require("express")
const router = express.Router();

const {addToWishlist,getWishListItems,updateWishlist}=require("../controllers/wishlistController");
const tokenAuthentication = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");



router.post("/add",tokenAuthentication,asyncHandler(addToWishlist))
router.get("/",tokenAuthentication,asyncHandler(getWishListItems))
router.patch("/update",tokenAuthentication,asyncHandler(updateWishlist))



module.exports=router