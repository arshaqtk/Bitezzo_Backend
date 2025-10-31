const Order = require("../../models/orders")

exports.getAllOrders=async(req,res)=>{
 const orders =await Order.find().populate("items.product")
    return res.status(200).json({success:true,orders})
}

exports.getOrderById=async(req,res)=>{
    const orderId=req.params

    const order=await Order.findById(orderId).populate("items.product")
    if(!order){
        return res.status(400).json({message:"Order not found"})
    }
    return res.status(200).json({success:true,order})
}

exports.updateOrderStatus=async(req,res)=>{
    const orderId=req.params
    const {status}=req.body

    const orders=await Order.findByIdAndUpdate(orderId,{status:status},{new:true,runValidators: true})
    if(!orders){
         return res.status(400).json({success:false,message:`Order status not Updated as ${status}` })
    }
    return res.status(200).json({success:true,message:`Order status Updated as ${status}`,orders })
}  