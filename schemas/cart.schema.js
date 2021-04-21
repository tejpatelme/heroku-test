const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Cart = model("Cart", CartSchema);

module.exports = { Cart };
