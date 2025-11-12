const express = require("express")
const router = express.Router();
const tokenAuthentication = require("../middlewares/authMiddleware");
const {getUserProfile, editUserProfileImage, userProfileStats, userNavStats}=require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");
const { uploadProfile } = require("../middlewares/upload");


router.get("/profile",tokenAuthentication,asyncHandler(getUserProfile))
router.patch("/profile/image",tokenAuthentication,uploadProfile.single('avatar'),asyncHandler(editUserProfileImage))
router.get("/profile/stats",tokenAuthentication,asyncHandler(userProfileStats))
router.get("/nav/stats",tokenAuthentication,asyncHandler(userNavStats))




module.exports=router