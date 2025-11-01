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
const isAdmin = require("../middlewares/AdminAuthenticationMiddleware");

router.get("/dashboard",tokenAuthentication,isAdmin, asyncHandler(dashboardStats))
router.get("/users",tokenAuthentication,isAdmin,asyncHandler(adminViewUsers))
router.patch("/users/toggle-block",tokenAuthentication,isAdmin,asyncHandler(toggleUserAuthentication))
router.get("/users/:_id",tokenAuthentication,isAdmin,asyncHandler(getUserById)) 
router.get("/users/:_id/order",tokenAuthentication,isAdmin,asyncHandler(getUserOrders)) 
router.get("/users/:_id/cart",tokenAuthentication,isAdmin,asyncHandler(getUserCart))

router.get("/products",tokenAuthentication,isAdmin,asyncHandler(getAllProducts))
router.patch("/products/:_id/soft-delete",tokenAuthentication,isAdmin,asyncHandler(softDeleteProduct))
router.post("/products/add-product",tokenAuthentication,uploadProduct.array('images',5),validator(productSchema),isAdmin,asyncHandler(addProduct))
router.put("/products/:_id/edit-product",tokenAuthentication,uploadProduct.array('images',5),isAdmin,asyncHandler(editProduct))



router.get("/orders",tokenAuthentication,isAdmin,asyncHandler(getAllOrders))
router.get("/orders/:_id",tokenAuthentication,isAdmin,asyncHandler(getOrderById))
router.patch("/orders/:_id/status",tokenAuthentication,isAdmin,asyncHandler(updateOrderStatus))

 




 
   

module.exports = router; 