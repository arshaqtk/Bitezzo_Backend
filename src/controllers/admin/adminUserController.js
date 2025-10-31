const Orders = require("../../models/orders")
const User = require("../../models/user")
const Cart = require("../../models/cart")


exports.adminViewUsers = async (req, res) => {
    const users = await User.find({ isAdmin: false }).select("-password -refreshToken")
    return res.status(200).json(users)
}

exports.toggleUserAuthentication = async (req, res) => {
    const { userId } = req.body
    const user = await User.findById(userId).select("-password -refreshToken")

    if (!user) {
        return res.status(400).json({ message: "User is not found" })
    }
    user.isAuthenticated = !user.isAuthenticated;
    await user.save();
    const message = user.isAuthenticated
        ? "User unblocked successfully"
        : "User blocked successfully";
    return res.status(200).json({ success: true, message, user })
}

exports.getUserById = async (req, res) => {
    const userId = req.params

    const user = await User.findById(userId).select("-password -refreshToken")
    if (!user) {
        return res.status(400).json({ message: "User is not found" })
    }
  
    return res.status(200).json({ success: true, user })
}

exports.getUserCart  = async (req, res) => {
    const userId = req.params

    const cart = await Cart.findOne({ cartBy: userId }).populate('items.product');

    if (!cart) {
        return res.status(400).json({ message: "No data  found" })
    }
    return res.status(200).json({ success: true, cart })
}

exports.getUserOrders  = async (req, res) => {
    const userId = req.params
    const order = await Orders.find({orderBy:userId}).limit(5).sort({createdAt:-1})
    if (!order) {
        return res.status(400).json({ message: "No data   found" })
    }

    return res.status(200).json({ success: true, order })
} 