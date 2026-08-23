const express = require("express");

const {
  checkout,
  getOrders,
  getOrderById,
} = require("../controllers/order.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

// Checkout using the logged-in user
router.post("/checkout", protect, checkout);

// Get logged-in user's orders
router.get("/", protect, getOrders);

// Get one of the logged-in user's orders
router.get("/:id", protect, getOrderById);

module.exports = router;
