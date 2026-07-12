const prisma = require("../config/prisma");

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products.",
    });
  }
};

// GET single product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product.",
    });
  }
};

// CREATE product
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
      include: {
        category: true,
        images: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product.",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};