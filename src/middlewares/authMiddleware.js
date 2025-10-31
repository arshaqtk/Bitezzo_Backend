const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenAuthentication = async (req, res, next) => {
  try {
     const authHeader = req.headers["authorization"];
    
  const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    const {_id}= decodedJwt
    req.userId = _id; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}; 
  
module.exports = tokenAuthentication;  
