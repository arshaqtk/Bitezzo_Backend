const Order = require("../models/orders")
const Cart = require("../models/cart")


exports.getOrderByUser=async(req,res)=>{
    const userId=req.userId
    try{
        const orders=await Order.find({orderBy:userId}).populate({
        path: "items.product",
        select: "name price images category description"
      })
        res.status(200).json({orders})

    }catch(err){res.status(500).json({ message: err.message })}
}

exports.addDirectOrder = async (req, res) => {
    const userId = req.userId
    const { productId, price, quantity, address, total, deliverySpeed, paymentMethod } = req.body
    try {
        const order = new Order({ orderBy: userId, items: [{ product: productId, price, quantity }], total, address, deliverySpeed, paymentMethod })
        await order.save()
        res.status(201).json({ message: "Ordered Successfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.addCartOrder = async (req, res) => {
    const userId = req.userId
    const { address, total, deliverySpeed, paymentMethod } = req.body

    try {
        const cart = await Cart.findOne({ cartBy: userId })
        cartItems = cart.items

        const order = new Order({ orderBy: userId, items: cartItems, total, address, deliverySpeed, paymentMethod })
        await order.save()

        const clearCart= await Cart.findByIdAndDelete(cart._id)

        res.status(201).json({ message: "Ordered Successfully", order })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


exports.cancelOrderByUser=async(req,res)=>{
    const {id}=req.params
    try{
        const updatedOrder= await Order.findByIdAndUpdate(id,{status:"cancelled"},{new:true})
 res.status(201).json({ message: "Cancelled Successfully", order:updatedOrder })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}