const prisma = require("../config/prisma");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      sku,
      price,
      salePrice,
      stockQuantity,
      isFeatured,
      isActive,
      categoryId,
    } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        sku,
        price,
        salePrice,
        stockQuantity,
        isFeatured,
        isActive,
        categoryId,
      },
    });
    res.status(201).json(product);
  }