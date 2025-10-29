const Orders = require("../../models/orders")
const Product = require("../../models/product")
const User = require("../../models/user")

exports.dashboardStats = async (req, res) => {
    const userCount = await User.countDocuments()
    const productCount = await Product.countDocuments()
    const orderCount = await Orders.countDocuments()
    const totalRevenueResult = await Orders.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }])
    const totalRevenue = totalRevenueResult[0]?.total || 0

    const OrdersByUser = await Orders.aggregate([
        { $group: { _id: "$orderBy", orders: { $sum: 1 } } },
        { $sort: { Orders: -1 } },
        { $limit: 5 },
        { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
        { $unwind: "$user" },
        { $project: { name: "$user.name", orders: 1 } }
    ])

    const orderByStatus = await Orders.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { _id: 0, status: "$_id", count: 1 } }])

    const topSellingProduct = await Orders.aggregate([
        { $unwind: "$items" },
        { $group: { _id: "$items.product", totalSold: { $sum: "$items.quantity" } } },
        { $sort: { totalSold: -1 } },
        { $limit: 8 },
        { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
        { $unwind: "$product" },
        { $project: { _id: 0, name: "$product.name", totalSold: 1 } }
    ])

    const revenueByDate = await Orders.aggregate([
        { $group: { _id: "$createdAt", revenue: { $sum: "$total" } } },
        { $sort: { revenue: -1 } },
        { $limit: 5 },
        { $project: { _id: 0, date: "$_id", revenue: 1 } }
    ])

    res.status(200).json({
        stats: { userCount, productCount, orderCount, totalRevenue },
        OrdersByUser,
        orderByStatus,
        topSellingProduct,
        revenueByDate
    })
}   

