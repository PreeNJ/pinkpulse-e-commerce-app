const express = require("express");

const router = express.Router();

const { addToCart } = require("../controllers/cart.controller");

router.post("/", addToCart);

module.exports = router;