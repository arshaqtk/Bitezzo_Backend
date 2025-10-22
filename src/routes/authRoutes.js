const express = require("express")
const router = express.Router();
const { signupValidator } = require("../middlewares/validation")


const { signup, login } = require("../controllers/authController");
router.post("/signup",signupValidator,signup);
router.post("/login", login);




module.exports = router