const express = require("express");

const categoriesRouter = express.Router();

let id = 3;

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
  .get((req, res) => res.json(categories))
  .post((req, res) => {
    const product = req.body;
    categories.push({ id: id++, ...product });
    res.json({ success: true, product });
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
