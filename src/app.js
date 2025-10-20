const express = require("express");
const cookieParser=require("cookie-parser")

const app=express()
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();


app.use(express.json())
app.use(cookieParser())


const authRouter=require("./routes/auth");
const userRouter=require("./routes/user");



app.use("/auth",authRouter)
app.use("/user",userRouter)



// app.get("/",async(req,res)=>{
//   try{
//     const users=await User.find()
//     res.send(users)
//   }catch(err){}
// })


connectDB().then(()=>{
  console.log("Database Connection established....");
   app.listen(5000, () => console.log("Server running on port 5000"));
}).catch((err)=>{
  console.log("Database cannot be connected!!",err)
});

