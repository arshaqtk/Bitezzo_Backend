const express = require("express")
const router = express.Router();
const tokenAuthentication = require("../middlewares/authMiddleware");
const {getUserProfile, editUserProfileImage, userProfileStats}=require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");
const { uploadProfile } = require("../middlewares/upload");


router.get("/profile",tokenAuthentication,asyncHandler(getUserProfile))
router.patch("/profile/image",tokenAuthentication,uploadProfile.single('avatar'),asyncHandler(editUserProfileImage))
router.get("/profile/stats",tokenAuthentication,asyncHandler(userProfileStats))



module.exports=router