const express = require("express")
const router = express.Router();

const tokenAuthentication = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");
const { dashboardStats } = require("../controllers/admin/adminDashboardController");
const { adminViewUsers, toggleUserAuthentication, getUserById, getUserOrders, getUserCart } = require("../controllers/admin/adminUserController");
const { getAllProducts } = require("../controllers/admin/adminProductController");

router.get("/dashboard",tokenAuthentication,asyncHandler(dashboardStats))
router.get("/users",tokenAuthentication,asyncHandler(adminViewUsers))
router.patch("/users/toggle-block",tokenAuthentication,asyncHandler(toggleUserAuthentication))
router.get("/users/:_id",tokenAuthentication,asyncHandler(getUserById))
router.get("/users/:_id/order",tokenAuthentication,asyncHandler(getUserOrders))
router.get("/users/:_id/cart",tokenAuthentication,asyncHandler(getUserCart))

router.get("/product",tokenAuthentication,asyncHandler(getAllProducts))



 

module.exports = router; 