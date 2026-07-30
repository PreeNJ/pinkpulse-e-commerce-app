const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
  uploadProductImage,
} = require("../controllers/productImage.controller");

router.post(
  "/",
  upload.single("image"),
  uploadProductImage
);

module.exports = router;