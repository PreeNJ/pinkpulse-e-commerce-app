const prisma = require("../config/prisma");

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

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

    // Check if product is already in cart
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

// GET USER CART
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            images: true,
            category: true,
          },
        },
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch cart.",
    });
  }
};

// UPDATE CART ITEM
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    const updatedItem = await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update cart item.",
    });
  }
};

// REMOVE CART ITEM
const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Item removed from cart.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove cart item.",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};