const jwt = require("jsonwebtoken");

const tokenAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies; 

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedJwt; 

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = tokenAuthentication;
