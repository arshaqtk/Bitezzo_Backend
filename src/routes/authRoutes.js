const express = require("express")
const router = express.Router();

const {validator} = require("../middlewares/validation");
const { signupSchema, loginSchema } = require("../validators/authValidator");
const asyncHandler = require("../utils/asyncHandler");
const { signup, login, refreshToken } = require("../controllers/authController");


router.post("/signup",validator(signupSchema),asyncHandler(signup));
router.post("/login",validator(loginSchema),asyncHandler(login))
router.post("/refresh", asyncHandler(refreshToken));





module.exports = router 