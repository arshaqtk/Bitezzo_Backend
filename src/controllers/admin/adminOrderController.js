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
    
    const updatedOrder=await Order.findByIdAndUpdate(orderId,{status:status},{new:true,runValidators: true})
    if(!updatedOrder){
        return res.status(400).json({success:false,message:`Order status not Updated as ${status}` })
    }
    const io = req.app.get("io"); 
    const userId=updatedOrder.orderBy
    
 const socketId = onlineUsers[userId];
    if (socketId) {
         io.to(socketId).emit("orderStatusUpdated", {
        orderId: updatedOrder._id,
        newStatus: updatedOrder.status,
        message: `Your order status has been updated to ${updatedOrder.status}`,
         });
    }
    return res.status(200).json({success:true,message:`Order status Updated as ${status}`,updatedOrder })
}  