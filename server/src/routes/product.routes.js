const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const protect = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
