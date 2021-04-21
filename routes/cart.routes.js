const mongoose = require("mongoose");
const express = require("express");
const { Cart } = require("../schemas/cart.schema");
const cartRouter = express.Router();

cartRouter.route("/").get(async (req, res) => {
  try {
    const cart = await Cart.find({}).populate("products", "name price");
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

cartRouter.route("/:cartId").get(async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await Cart.findById(cartId).populate({
      path: "products",
      select: "name price",
    });
    res.json(cart);
  } catch (error) {
    res.json({ error: error.message });
  }
});

cartRouter.route("/:cartId/:productId").post(async (req, res) => {
  const { productId, cartId } = req.params;
  try {
    const newCart = await Cart.findById(cartId);
    newCart.products.push(mongoose.Types.ObjectId(productId));
    newCart.save();
    res.json({ success: true, newCart });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = { cartRouter };
