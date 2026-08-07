const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, removeCartItem);

module.exports = router;