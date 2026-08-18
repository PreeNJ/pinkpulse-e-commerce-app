const express = require("express");
const protect = require("../middleware/auth.middleware");

const { checkout } = require("../controllers/checkout.controller");

const router = express.Router();

router.post("/", protect, checkout);

module.exports = router;