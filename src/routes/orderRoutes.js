const express = require("express")
const router = express.Router();

const {addDirectOrder, addCartOrder, getOrderByUser, cancelOrderByUser}=require("../controllers/orderController");
const tokenAuthentication = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");


// router.get("/",tokenAuthentication,getCartItems)
router.post("/direct",tokenAuthentication,asyncHandler(addDirectOrder))
router.post("/from-cart",tokenAuthentication,asyncHandler(addCartOrder))
router.get("/my",tokenAuthentication,asyncHandler(getOrderByUser))
router.patch("/:id/cancel",tokenAuthentication,asyncHandler(cancelOrderByUser))



// router.patch("/updateQuantity",tokenAuthentication,updateCartQuantity)
// router.patch("/remove",tokenAuthentication,deleteCartItem)




module.exports=router