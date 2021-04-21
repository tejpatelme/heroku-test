const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./routes/dbConnection");
const {
  categoriesRouter,
  productsRouter,
  cartRouter,
} = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) =>
  res.send("Hello World! This is a test of deploying express app on heroku")
);

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Error 404" })
);

app.listen(PORT, () => console.log("server running on port", PORT));
