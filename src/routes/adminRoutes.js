const express = require("express")
const router = express.Router();

const tokenAuthentication = require("../middlewares/authMiddleware");
const {validator} = require("../middlewares/validation");
const asyncHandler = require("../utils/asyncHandler");
const { dashboardStats } = require("../controllers/admin/adminDashboardController");
const { adminViewUsers, toggleUserAuthentication, getUserById, getUserOrders, getUserCart } = require("../controllers/admin/adminUserController");
const { getAllProducts, softDeleteProduct, addProduct, editProduct } = require("../controllers/admin/adminProductController");
const { getAllOrders, getOrderById, updateOrderStatus } = require("../controllers/admin/adminOrderController");
const {uploadProduct} = require("../middlewares/upload");
const { productSchema } = require("../validators/productValidator");

router.get("/dashboard",tokenAuthentication,asyncHandler(dashboardStats))
router.get("/users",tokenAuthentication,asyncHandler(adminViewUsers))
router.patch("/users/toggle-block",tokenAuthentication,asyncHandler(toggleUserAuthentication))
router.get("/users/:_id",tokenAuthentication,asyncHandler(getUserById)) 
router.get("/users/:_id/order",tokenAuthentication,asyncHandler(getUserOrders)) 
router.get("/users/:_id/cart",tokenAuthentication,asyncHandler(getUserCart))

router.get("/products",tokenAuthentication,asyncHandler(getAllProducts))
router.patch("/products/:_id/soft-delete",tokenAuthentication,asyncHandler(softDeleteProduct))
router.post("/products/add-product",tokenAuthentication,uploadProduct.array('images',5),validator(productSchema),asyncHandler(addProduct))
router.put("/products/:_id/edit-product",tokenAuthentication,uploadProduct.array('images',5),asyncHandler(editProduct))



router.get("/orders",tokenAuthentication,asyncHandler(getAllOrders))
router.get("/orders/:_id",tokenAuthentication,asyncHandler(getOrderById))
router.patch("/orders/:_id/status",tokenAuthentication,asyncHandler(updateOrderStatus))

 




 
   

module.exports = router; 