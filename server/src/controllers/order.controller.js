const { Prisma } = require("@prisma/client");
const prisma = require("../config/prisma");

// CHECKOUT
const checkout = async (req, res) => {
  try {
    // Get user from authentication middleware
    const userId = req.user.id;

    const order = await prisma.$transaction(async (tx) => {
      // 1. Get user's cart
      const cartItems = await tx.cartItem.findMany({
        where: {
          userId,
        },
        include: {
          product: true,
        },
      });

      // 2. Make sure the cart isn't empty
      if (cartItems.length === 0) {
        throw new Error("CART_EMPTY");
      }

      // 3. Validate products and stock
      for (const item of cartItems) {
        if (!item.product.isActive) {
          throw new Error(`PRODUCT_INACTIVE:${item.product.name}`);
        }

        if (item.product.stockQuantity < item.quantity) {
          throw new Error(`INSUFFICIENT_STOCK:${item.product.name}`);
        }
      }

      // 4. Calculate total using current database prices
      const total = cartItems.reduce((sum, item) => {
        const price = item.product.salePrice ?? item.product.price;

        return sum.plus(price.mul(item.quantity));
      }, new Prisma.Decimal(0));

      // 5. Create the order and order items
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.salePrice ?? item.product.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // 6. Reduce product stock
      for (const item of cartItems) {
        const updatedProduct = await tx.product.updateMany({
          where: {
            id: item.productId,
            stockQuantity: {
              gte: item.quantity,
            },
          },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });

        // Prevent overselling if stock changed during checkout
        if (updatedProduct.count === 0) {
          throw new Error(`INSUFFICIENT_STOCK:${item.product.name}`);
        }
      }

      // 7. Clear user's cart
      await tx.cartItem.deleteMany({
        where: {
          userId,
        },
      });

      return newOrder;
    });

    // 8. Return completed order
    return res.status(201).json({
      success: true,
      message: "Checkout successful.",
      order,
    });
  } catch (error) {
    console.error(error);

    if (error.message === "CART_EMPTY") {
      return res.status(400).json({
        message: "Your cart is empty.",
      });
    }

    if (error.message.startsWith("PRODUCT_INACTIVE:")) {
      const productName = error.message.split(":")[1];

      return res.status(400).json({
        message: `Product "${productName}" is no longer available.`,
      });
    }

    if (error.message.startsWith("INSUFFICIENT_STOCK:")) {
      const productName = error.message.split(":")[1];

      return res.status(400).json({
        message: `Not enough stock available for "${productName}".`,
      });
    }

    return res.status(500).json({
      message: "Checkout failed.",
    });
  }
};

// GET LOGGED-IN USER'S ORDERS
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
};

// GET SINGLE ORDER
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch order.",
    });
  }
};

module.exports = {
  checkout,
  getOrders,
  getOrderById,
};
