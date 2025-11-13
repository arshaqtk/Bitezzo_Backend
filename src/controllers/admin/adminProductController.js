const Products=require("../../models/product")


exports.getAllProducts =async(req,res)=>{
    const products =await Products.find()
    return res.status(200).json({success:true,products})
}   


exports.softDeleteProduct=async(req,res)=>{
    const productId=req.params

    const product = await Products.findById(productId)
    if (!product) {
        return res.status(400).json({ message: "Product is not found" })
    }
    product.isActive=!product.isActive
   await  product.save()
    const message =  product.isActive
        ? "Product activated successfully"
        : "Product inactivated successfully";
    return res.status(200).json({success:true,message,product})
}

exports.addProduct=async(req,res)=>{
    const {name,description,price,count,category}=req.body

    const images=req.files.map(file=>({
        url:file.path,
        alt:file.filename,
    }))

    const product =await Products.create({
        name,description,price,count,category,images})

        return res.status(200).json({success:true,message: 'Product added successfully', product})
    }
 
    exports.editProduct=async(req,res)=>{
    const {name,description,price,count,category}=req.body
    const productId=req.params
    const images=req.files.map(file=>({
        url:file.path,
        alt:file.filename,
    }))

    const product =await Products.findByIdAndUpdate(productId,{ name,description,price,count,category,images},{new:true})

        return res.status(200).json({success:true,message: 'Product edited successfully', product})
    }