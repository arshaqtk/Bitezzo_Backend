// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const wishlistSchema = new Schema(
//   {
//     wishlistBy: {
//       type: Schema.Types.ObjectId,
//       ref: "User", 
//       required: true,
//     },
//     product: {
//       type: Schema.Types.ObjectId,
//       ref: "Product", 
//       required: true,
//     },
//   },
//   { timestamps: { createdAt: 'addedAt', updatedAt: false } } )

// module.exports = mongoose.model("Wishlist", wishlistSchema)

const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema(
  {
    wishlistBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ensures one document per user
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
