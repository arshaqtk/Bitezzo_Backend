const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

exports.refreshToken=async(req,res)=>{

  const refreshToken=req.cookies.refreshToken
  if(!refreshToken) return res.sendStatus(401).json({ message: "Refresh token not found" })

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
     if (err) return res.sendStatus(403).json({ message: "Invalid or expired refresh token" })

     const newAccessToken=jwt.sign({_id:decoded._id},process.env.JWT_SECRET,{expiresIn:"1d"})

    return  res.json({accessToken:newAccessToken})
  })
}

exports.signup= async (req, res) => {
    
        const { name, email, password } = req.body
        const HashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name:name, email, password: HashedPassword });
        await user.save();
        res.status(201).json(user);
    
}

exports.login= async (req, res) => {
  
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
        name: user.name, 
        email: user.email,
        isAuthenticated:user.isAuthenticated,
        isAdmin:user.isAdmin
      }
    });
}