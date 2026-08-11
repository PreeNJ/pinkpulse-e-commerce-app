const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/", addToCart);

router.get("/:userId", getCart);

router.put("/:userId/:productId", updateCartItem);

router.delete("/:userId/:productId", removeFromCart);

router.delete("/:userId", clearCart);

module.exports = router;
