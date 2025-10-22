const express = require("express")
const router = express.Router();

const {addToWishlist,getWishListItems,updateWishlist}=require("../controllers/wishlistController");
const tokenAuthentication = require("../middlewares/authMiddleware");



router.post("/add",tokenAuthentication,addToWishlist)
router.get("/",tokenAuthentication,getWishListItems)
router.patch("/update",tokenAuthentication,updateWishlist)



module.exports=router