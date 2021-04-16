const express = require("express");

const productsRouter = express.Router();

let id = 3;

let products = [
  {
    id: 1,
    name: "japani joota",
    price: 1500,
  },

  {
    id: 2,
    name: "reshmi rajai",
    price: 3000,
  },
];

productsRouter
  .route("/")
  .get((req, res) => res.json(products))
  .post((req, res) => {
    const newProduct = req.body;
    products.push({ id: id++, ...newProduct });
    res.json({ success: true, newProduct });
  });

productsRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const match = products.find((product) => product.id === parseInt(id));
    res.json(match);
  })
  .post((req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    products.forEach((product) => {
      if (product.id === parseInt(id)) {
        product.price = updatedProduct.price;
      }
    });

    res.json({ success: true, updatedProduct });
  });

module.exports = { productsRouter };
