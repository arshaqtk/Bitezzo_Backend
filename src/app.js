const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();
const ratelimit=require("express-rate-limit")


const app = express();
const server = http.createServer(app);
 

app.use(express.json());
app.use(cookieParser());
app.use( 
  cors({
    origin: ["http://localhost:5173","https://bitezzo-mern-68gz.vercel.app",],
    credentials: true,
  })
);
app.use(ratelimit({
  windowMs: 15 * 60 * 1000,
  limit:50,
  message:"Too many calls"
}))

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://bitezzo-mern-68gz.vercel.app",],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = {};
io.on("connection", (socket) => {
  console.log(" A user connected:", socket.id);

socket.on("registerUser", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("User registered:", userId, socket.id);
  });

  socket.on("disconnect", () => {
    for (const id in onlineUsers) {
      if (onlineUsers[id] === socket.id) {
        delete onlineUsers[id];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

app.set("io", io);
global.onlineUsers = onlineUsers;

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoute");
const wishlistRouter = require("./routes/wishlistRoutes");
const orderRouter = require("./routes/orderRoutes");
const adminRouter = require("./routes/adminRoutes");


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


connectDB()
  .then(() => {
    console.log("Database connection established...");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed!", err);
  });
