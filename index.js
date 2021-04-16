const express = require("express");
const { categoriesRouter } = require("./routes/categories.router");
const { productsRouter } = require("./routes/products.router");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);

app.get("/", (req, res) =>
  res.send("Hello World! This is a test of deploying express app on heroku")
);

app.listen(PORT, () => console.log("server running on port", PORT));
