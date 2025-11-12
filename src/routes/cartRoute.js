const express = require("express")
const router = express.Router();

const {addToCart,getCartItems, updateCartQuantity, deleteCartItem, getCartItemsCount}=require("../controllers/cartController");
const tokenAuthentication = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");


router.get("/",tokenAuthentication,asyncHandler(getCartItems))
router.get("/cart-count",tokenAuthentication,asyncHandler(getCartItemsCount))
router.post("/add",tokenAuthentication,asyncHandler(addToCart))
router.patch("/updateQuantity",tokenAuthentication,asyncHandler(updateCartQuantity))
router.patch("/remove",tokenAuthentication,asyncHandler(deleteCartItem))




module.exports=router