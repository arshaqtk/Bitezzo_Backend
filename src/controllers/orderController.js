const Order = require("../models/orders")


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
    const { price, quantity, address, total, deliverySpeed, paymentMethod } = req.body
    try {
        const cartId=
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}