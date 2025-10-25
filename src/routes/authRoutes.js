const express = require("express")
const router = express.Router();
const { signupValidator } = require("../middlewares/validation")


const { signup, login, refreshToken } = require("../controllers/authController");
router.post("/signup",signupValidator,signup);
router.post("/login", login)
router.post("/refresh", refreshToken);





module.exports = router