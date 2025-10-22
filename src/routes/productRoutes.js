const express = require("express")
const router = express.Router();
const Product=require("../models/product");
const {getAllProducts,getProductById,addProduct,filterProduct}=require("../controllers/productController")


router.get("/",getAllProducts)

router.get("/:id",getProductById)  


router.post("/add",addProduct)

router.get("/category/:category",filterProduct)


module.exports=router