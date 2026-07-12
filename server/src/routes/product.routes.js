const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
} = require("../controllers/product.controller");

// GET all products
router.get("/", getProducts);

// CREATE product
router.post("/", createProduct);

module.exports = router;