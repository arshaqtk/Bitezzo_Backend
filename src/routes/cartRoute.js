const express = require("express")
const router = express.Router();

const {addToCart,getCartItems, updateCartQuantity, deleteCartItem}=require("../controllers/cartController");
const tokenAuthentication = require("../middlewares/authMiddleware");


router.get("/",tokenAuthentication,getCartItems)
router.post("/add",tokenAuthentication,addToCart)
router.patch("/updateQuantity",tokenAuthentication,updateCartQuantity)
router.patch("/remove",tokenAuthentication,deleteCartItem)




module.exports=router