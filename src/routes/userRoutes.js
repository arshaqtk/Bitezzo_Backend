const express = require("express")
const router = express.Router();
const tokenAuthentication = require("../middlewares/authMiddleware");
const {getUserProfile}=require("../controllers/userController")

router.get("/profile",tokenAuthentication,getUserProfile)

module.exports=router