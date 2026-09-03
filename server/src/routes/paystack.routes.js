const express = require("express");

const {
  initializeTransaction,
  verifyTransaction,
} = require("../controllers/paystack.controller");

const router = express.Router();

router.post("/initialize", initializeTransaction);
router.get("/verify/:reference", verifyTransaction);

module.exports = router;