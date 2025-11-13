const mongoose = require("mongoose")


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    count: { type: Number, default: 0, min: 0 },
    category: { type: String, index: true },
    images: [{ url: String, alt: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({
  name: "text",
  category: "text"
});


module.exports=mongoose.model("Product",productSchema)