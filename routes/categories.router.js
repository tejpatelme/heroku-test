const express = require("express");
const { Category } = require("../schemas/category.schema");

const categoriesRouter = express.Router();

// let id = 3;

let categories = [
  {
    id: 1,
    name: "electronics",
    noOfProducts: 10,
  },
  {
    id: 2,
    name: "books",
    noOfProducts: 50,
  },
];

categoriesRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const response = await Category.find({});
      res.json({
        success: true,
        response,
      });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const category = req.body;
      const newCategory = new Category(category);
      const response = await newCategory.save();
      res.json({ success: true, response });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

categoriesRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const match = categories.find((category) => category.id === parseInt(id));
    res.json(match);
  })
  .post((req, res) => {
    const updatedProduct = req.body;
    const { id } = req.params;

    categories.forEach((category) => {
      if (category.id === parseInt(id)) {
        category.noOfProducts = updatedProduct.noOfProducts;
      }
    });

    res.json({ success: true, updatedProduct });
  });

module.exports = { categoriesRouter };
