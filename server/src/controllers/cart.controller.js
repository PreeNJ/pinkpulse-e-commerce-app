const prisma = require("../config/prisma");

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({
        message: "productId is required.",
      });
    }

    const requestedQuantity = quantity || 1;

    if (requestedQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    if (!product.isActive) {
      return res.status(400).json({
        message: "Product is not available.",
      });
    }

    if (product.stockQuantity < requestedQuantity) {
      return res.status(400).json({
        message: "Not enough stock available.",
      });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    let cartItem;

    if (existingItem) {
      const newQuantity = existingItem.quantity + requestedQuantity;

      if (product.stockQuantity < newQuantity) {
        return res.status(400).json({
          message: "Not enough stock available.",
        });
      }

      cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
        },
        include: {
          product: true,
        },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity: requestedQuantity,
        },
        include: {
          product: true,
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Product added to cart.",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add product to cart.",
    });
  }
};

// GET USER CART
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = cartItems.reduce((sum, item) => {
      const price = Number(
        item.product.salePrice ?? item.product.price
      );

      return sum + price * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      cart: cartItems,
      total,
    });
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
    const { productId } = req.params;
    const userId = req.user.id;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1.",
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

    if (product.stockQuantity < quantity) {
      return res.status(400).json({
        message: "Not enough stock available.",
      });
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: {
        quantity,
      },
      include: {
        product: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Cart updated.",
      cartItem,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    res.status(500).json({
      message: "Failed to update cart.",
    });
  }
};

// REMOVE CART ITEM
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Product removed from cart.",
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Cart item not found.",
      });
    }

    res.status(500).json({
      message: "Failed to remove product from cart.",
    });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to clear cart.",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
