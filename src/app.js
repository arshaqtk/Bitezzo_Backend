const express = require("express");
const cookieParser=require("cookie-parser")

const app=express()
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


const authRouter=require("./routes/authRoutes");
const userRouter=require("./routes/userRoutes");
const productRouter=require("./routes/productRoutes");
const cartRouter=require("./routes/cartRoute")
const wishlsitRouter=require("./routes/wishlistRoutes")





app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/products",productRouter)
app.use("/cart",cartRouter)
app.use("/wishlist",wishlsitRouter)


 

connectDB().then(()=>{
  console.log("Database Connection established....");
   app.listen(5000, () => console.log("Server running on port 5000"));
}).catch((err)=>{
  console.log("Database cannot be connected!!",err)
});
  
