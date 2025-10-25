const express = require("express")
const router = express.Router();

const {addDirectOrder, addCartOrder, getOrderByUser, cancelOrderByUser}=require("../controllers/orderController");
const tokenAuthentication = require("../middlewares/authMiddleware");


// router.get("/",tokenAuthentication,getCartItems)
router.post("/direct",tokenAuthentication,addDirectOrder)
router.post("/from-cart",tokenAuthentication,addCartOrder)
router.get("/my",tokenAuthentication,getOrderByUser)
router.patch("/:id/cancel",tokenAuthentication,cancelOrderByUser)



// router.patch("/updateQuantity",tokenAuthentication,updateCartQuantity)
// router.patch("/remove",tokenAuthentication,deleteCartItem)




module.exports=router