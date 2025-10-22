const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.filterProduct=async (req,res)=>{
    
try{
    const category=req.params.category
    if(category=="all"){
    const products=await Product.find()
    res.status(201).json(products);
    }else{
    const products=await Product.find({category:category})

     if (products.length==0) {
        return res.status(404).json({ message: "products not found" });
     }
     res.status(201).json(products);
    }
}
catch(err){ res.status(400).json({ message: err.message });}
}
