const multer=require("multer")
const {productStorage, profileStorage}=require("../config/cloudinary")

const uploadProduct = multer({ storage: productStorage });


const uploadProfile = multer({ storage: profileStorage });

module.exports={uploadProduct,uploadProfile};