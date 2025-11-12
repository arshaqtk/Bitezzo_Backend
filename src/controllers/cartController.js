const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart")



exports.addToCart = async (req, res) => {

  const { productId, price } = req.body
  const userId = req.user._id


  const cart = await Cart.findOne({ cartBy: userId });
  const cartId = cart?._id
  if (!cart) {
    const newCart = new Cart({
      cartBy: userId,
      items: [{ product: productId, price }]
    });

    await newCart.save();
    const populatedCart = await Cart.findById(newCart._id).populate({
      path: "items.product",
      select: "name price images category description"
    });

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart: populatedCart
    });

  }

  const existingCart = await Cart.find({
    _id: cartId,
    items: { $elemMatch: { product: productId } }
  })

  if (existingCart.length > 0) {
    return res.status(400).json({ message: "Product already exists in the cart" });
  }

  const updatedCart = await Cart.findByIdAndUpdate(
    cartId,
    { $push: { items: { product: productId, price } } },
    { new: true, runValidators: true }
  ).populate({
    path: "items.product",
    select: "name price images category description"
  });

  return res.status(200).json({
    message: "Product added to cart successfully",
    cart: updatedCart
  });


} 


exports.getCartItems = async (req, res) => {

  const userId = req.user._id;
  const cart = await Cart.find({ cartBy: userId }).populate({
    path: "items.product",
    select: "name price images category description"
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ cart: cart });
};




exports.updateCartQuantity = async (req, res) => {
  const userId = req.user._id
  const { productId, action } = req.body


  const cart = await Cart.findOne({ cartBy: userId, "items.product": productId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(i => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  if (action === "decrease" && item.quantity <= 1) {
    return res.status(400).json({ message: "Quantity cannot go below 1" });
  }
  let incrementValue = action === "increase" ? 1 : -1

  updatedCart = await Cart.findOneAndUpdate(
    { cartBy: userId, "items.product": productId }, { $inc: { "items.$.quantity": incrementValue } },
    { new: true }).populate({
      path: "items.product",
      select: "name price images category description"
    });

  updatedCart.items = updatedCart.items.filter(item => item.quantity > 0)
  await updatedCart.save();

  res.status(200).json({ message: "updated Qantity", cart: updatedCart });



}


exports.deleteCartItem = async (req, res) => {
  const userId = req.user._id
  const { productId } = req.body


  updatedCart = await Cart.findOneAndUpdate(
    { cartBy: userId }, { $pull: { items: { product: productId } } }, { new: true }).populate({
      path: "items.product",
      select: "name price images category description"
    });

  if (!updatedCart) return res.status(404).json({ message: "Cart not found" });


  res.status(200).json({ message: "Item removed from cart", cart: updatedCart });



} 