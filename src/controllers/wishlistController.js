const Wishlist = require("../models/wishlist")



exports.addToWishlist = async (req, res) => {

    const { productId } = req.body
    const userId = req.userId
    try {
        
        const wishlist = await Wishlist.findOne({ wishlistBy: userId });
        const wishlistId = wishlist?._id
       
        if (!wishlist) {
            const newWishlist = new Wishlist({ wishlistBy: userId, items: [{ product: productId }] })
            await newWishlist.save()
            return res.status(200).json({
                message: "Product added to wishlist successfully",
                wishlist: newWishlist
            })
        }

        const existingWishlist = await Wishlist.find({
            _id: wishlistId,
            items: { $elemMatch: { product: productId } }
        })
        if (existingWishlist.length > 0) {
            return res.status(400).json({ message: "Product already exists in the wishlist" });
        }

        const updatedWishlist = await Wishlist.findByIdAndUpdate(
            wishlistId,
            { $push: { items: { product: productId } } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Product added to wishlist successfully",
            wishlist: updatedWishlist
        });

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


exports.getWishListItems = async (req, res) => {
    try {
        const userId = req.userId;
        const wishlist = await Wishlist.find({ wishlistBy: userId }).populate({
            path: "items.product",
            select: "name price images category description"
        });
        
        if (wishlist.length==0) {
            return res.status(404).json({ message: "No items  found" });
        }
        const wishlistProducts = wishlist[0].items
        
        res.status(200).json({ wishlist: wishlistProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateWishlist = async (req, res) => {
    try {
    
        const {productId}=req.body
        const userId=req.userId
        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { wishlistBy: userId },
            { $pull: { items: { product: productId } } },{new:true}
        );
        
        const wishlistProducts = updatedWishlist.items
         res.status(200).json({ message:"Product Removed",wishlist: wishlistProducts });
    } catch (err) { res.status(500).json({ message: err.message }); }
} 