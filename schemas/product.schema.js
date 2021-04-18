const mongoose = require("mongoose");
require("mongoose-type-url");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: "Product name is required field",
    },
    modelNo: {
      type: String,
      unique: "modelNo should be unique",
      required: "modelNo is a required field",
    },
    price: {
      type: Number,
      required: "price is a required field",
    },
    url: {
      type: String,
      work: mongoose.SchemaTypes.Url,
      profile: mongoose.SchemaTypes.Url,
      required: "Url is a required field",
    },
    description: {
      type: String,
      minLength: [
        300,
        "Description of the product should be 300 characters or more",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Product = new model("Product", ProductSchema);

module.exports = { Product };
