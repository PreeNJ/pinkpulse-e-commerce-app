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

    // Check if item is already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + (quantity || 1),
        },
      });

      return res.status(200).json(updatedItem);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity: quantity || 1,
      },
    });

    res.status(201).json(cartItem);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add item to cart.",
    });
  }
};

module.exports = {
  addToCart,
};