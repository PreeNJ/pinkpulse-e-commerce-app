const express = require("express");

const router = express.Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
} = require("../controllers/category.controller");

// GET all categories
router.get("/", getCategories);

// GET single category
router.get("/:id", getCategoryById);

// CREATE category
router.post("/", createCategory);

// UPDATE category
router.put("/:id", updateCategory);

module.exports = router;