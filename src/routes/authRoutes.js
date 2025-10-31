const express = require("express")
const router = express.Router();

const { signupValidator } = require("../middlewares/validation")
const asyncHandler = require("../utils/asyncHandler");
const { signup, login, refreshToken } = require("../controllers/authController");


router.post("/signup",signupValidator,asyncHandler(signup));
router.post("/login",asyncHandler(login))
router.post("/refresh", asyncHandler(refreshToken));





module.exports = router 