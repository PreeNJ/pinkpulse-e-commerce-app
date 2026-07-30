const prisma = require("../config/prisma");

const uploadProductImage = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded.",
      });
    }
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }