const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

exports.refreshToken=async(req,res)=>{
  try{
  const refreshToken=req.cookies.refreshToken
  if(!refreshToken) return res.sendStatus(401).json({ message: "Refresh token not found" })

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
     if (err) return res.sendStatus(403).json({ message: "Invalid or expired refresh token" })

     const newAccessToken=jwt.sign({_id:decoded._id},process.env.JWT_SECRET,{expiresIn:"1d"})

     res.json({accessToken:newAccessToken})
  })}catch(err){
     res.status(400).json({ message: err.message });
  }
}

exports.signup= async (req, res) => {
    try {
        const { name, email, password } = req.body
        const HashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username:name, email, password: HashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
         console.error("Signup Error:", err);
        res.status(400).json({ message: err.message });
    }
}

exports.login= async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken= jwt.sign(
      {_id:user._id,email:user.email},
    process.env.REFRESH_TOKEN_SECRET,
  {expiresIn:"14d"})

  user.refreshToken=refreshToken
  await user.save()

    res.cookie("refreshToken", refreshToken, { httpOnly: true,
       sameSite: "lax" });

    res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      user: {
        id: user._id,
        username: user.username, 
        email: user.email,
        isAuthenticated:user.isAuthenticated
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}