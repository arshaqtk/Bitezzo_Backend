const express = require("express")
const router = express.Router();
const tokenAuthentication = require("../middlewares/authMiddleware");
const {getUserProfile, getUserCount}=require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");


router.get("/profile",tokenAuthentication,asyncHandler(getUserProfile))



module.exports=router