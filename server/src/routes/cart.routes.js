const prisma = require("../config/prisma");

// ADD product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    // Check if product exists
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