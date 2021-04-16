const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: String,
  noOfProducts: Number,
});

const Category = model("Category", CategorySchema);

module.exports = { Category };
