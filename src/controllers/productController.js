const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {

   const page = parseInt(req.query.page) || 1;   
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit

  const products = await Product.find({isActive:true}) .skip(skip).limit(limit);

  const total = await Product.countDocuments()


 res.json({total,page,totalPages: Math.ceil(total / limit),products});

};

exports.getProductById = async (req, res) => {

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);

};

// exports.addProduct = async (req, res) => {

//   const product = new Product(req.body);
//   await product.save();
//   res.status(201).json({ message: "Product added successfully" });

// };


exports.filterProduct = async (req, res) => {


  const category = req.params.category
  if (category == "all") {
    const products = await Product.find()
    res.status(201).json(products);
  } else {
    const products = await Product.find({ category: category })

    if (products.length == 0) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(201).json(products);
  }
}

