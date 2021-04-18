const express = require("express");
const { Product } = require("../schemas/product.schema");
const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const newProduct = new Product(product);
      const response = await newProduct.save();
      res.json({ success: true, response });
    } catch (error) {
      res.status(500).json({
        success: false,
        errorMessage: error.message,
      });
    }
  });

productsRouter.param("productId", async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (product) {
      req.product = product;
      next();
      return;
    }
    res.status(500).json({ success: false, errorMessage: "product not found" });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.message });
  }
});

productsRouter
  .route("/:productId")
  .get((req, res) => {
    let { product } = req;
    product.__v = undefined;
    res.json({ success: true, product });
  })
  .delete(async (req, res) => {
    try {
      const product = await Product.deleteOne({ _id: req.product._id });
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

module.exports = { productsRouter };
