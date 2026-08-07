const express = require("express");

const {
  checkout,
  getOrders,
  getOrderById,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/checkout", checkout);

router.get("/", getOrders);

router.get("/:id", getOrderById);

module.exports = router;