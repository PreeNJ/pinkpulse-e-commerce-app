const prisma = require("../config/prisma");

const uploadProductImage = async (req, res) => {
  try {
    const { productId } = req.body;

    console.log("req.body:", req.body);
    console.log("productId:", productId);

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

    console.log("product:", product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    const image = await prisma.productImage.create({
      data: {
        imageUrl: `/uploads/${req.file.filename}`,
        altText: product.name,
        productId,
      },
    });

    res.status(201).json(image);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to upload image.",
    });
  }
};

module.exports = {
  uploadProductImage,
};