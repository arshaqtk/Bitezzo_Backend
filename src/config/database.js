const  mongoose = require("mongoose");

const connectDB=async()=>{
 await mongoose.connect("mongodb+srv://arshaqtk4_db_user:svbSUNdUv0XEJ5N6@cluster0.qdm0qjr.mongodb.net/Bitezzo")
}

module.exports=connectDB