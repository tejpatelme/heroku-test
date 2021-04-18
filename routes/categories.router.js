const express = require("express");
const { extend } = require("lodash");
const { Category } = require("../schemas/category.schema");

const categoriesRouter = express.Router();

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

categoriesRouter.param("categoryId", async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (category) {
      req.category = category;
      next();
      return;
    }
    res
      .status(500)
      .json({ success: false, errorMessage: "category not found!" });
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: error.message });
  }
});

categoriesRouter
  .route("/:categoryId")
  .get((req, res) => {
    let { category } = req;
    category.__v = undefined;
    res.json({ success: true, category });
  })
  .post(async (req, res) => {
    try {
      let categoryToUpdate = req.category;
      const updatedCategory = req.body;
      categoryToUpdate = _.extend(categoryToUpdate, updatedCategory);
      categoryToUpdate = await categoryToUpdate.save();
      res.json({ success: true, categoryToUpdate });
    } catch (error) {
      res.json({ success: false, categoryToUpdate });
    }
  })
  .delete(async (req, res) => {
    try {
      const { category } = req;
      const response = await category.remove();
      res.json({ success: true, response });
    } catch (error) {
      res.status(500).json({ success: false, errorMessage: error.message });
    }
  });

module.exports = { categoriesRouter };
