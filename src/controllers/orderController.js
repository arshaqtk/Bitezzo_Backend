const Order = require("../models/orders")
const Cart = require("../models/cart")


exports.getOrderByUser=async(req,res)=>{
    const userId=req.user._id
  
        const orders=await Order.find({orderBy:userId}).populate({
        path: "items.product",
        select: "name price images category description"
      })
        res.status(200).json({orders})

}

exports.addDirectOrder = async (req, res) => {
    const userId = req.user._id
    const { productId, price, quantity, address, total, deliverySpeed, paymentMethod } = req.body
   
        const order = new Order({ orderBy: userId, items: [{ product: productId, price, quantity }], total, address, deliverySpeed, paymentMethod })
        await order.save()
        res.status(201).json({ message: "Ordered Successfully" })

   
}

exports.addCartOrder = async (req, res) => {
    const userId = req.user._id
    const { address, total, deliverySpeed, paymentMethod } = req.body

   
        const cart = await Cart.findOne({ cartBy: userId })
        cartItems = cart.items

        const order = new Order({ orderBy: userId, items: cartItems, total, address, deliverySpeed, paymentMethod })
        await order.save()

        const clearCart= await Cart.findByIdAndDelete(cart._id)

        res.status(201).json({ message: "Ordered Successfully", order })
   
}


exports.cancelOrderByUser=async(req,res)=>{
    const {id}=req.params
    
        const updatedOrder= await Order.findByIdAndUpdate(id,{status:"cancelled"},{new:true})
 res.status(201).json({ message: "Cancelled Successfully", order:updatedOrder })
    
}