const express = require("express")
const router = express.Router();

const {addDirectOrder}=require("../controllers/orderController");
const tokenAuthentication = require("../middlewares/authMiddleware");


// router.get("/",tokenAuthentication,getCartItems)
router.post("/direct",tokenAuthentication,addDirectOrder)
// router.patch("/updateQuantity",tokenAuthentication,updateCartQuantity)
// router.patch("/remove",tokenAuthentication,deleteCartItem)




module.exports=router