const express = require("express");

const { stkPush, queryStkPush, stkCallback } = require("../controllers/mpesa.controller");

const router = express.Router();

router.post("/stkpush", stkPush);
router.get("/query/:checkoutRequestId", queryStkPush);
router.post("/callback", stkCallback);

module.exports = router;
