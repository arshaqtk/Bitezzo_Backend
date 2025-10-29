const Products=require("../../models/product")


exports.getAllProducts =(req,res)=>{
    const product =Products.find()
    res.status(200).json({success:true,product})
}