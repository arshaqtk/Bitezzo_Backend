const express = require("express")
const router = express.Router();
const Product=require("../models/product");
const {getAllProducts,getProductById,addProduct,filterProduct}=require("../controllers/productController");
const asyncHandler = require("../utils/asyncHandler");


router.get("/",asyncHandler(getAllProducts))
router.get("/:id",asyncHandler(getProductById))
// router.post("/add",(addProduct))
router.get("/category/:category",asyncHandler(filterProduct))

module.exports=router