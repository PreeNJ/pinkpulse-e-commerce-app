const prisma = require("../config/prisma");

// CHECKOUT
const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    // Check if cart is empty
    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty.",
      });
    }

    // Validate stock and calculate total
    let total = 0;

    for (const item of cartItems) {
      if (!item.product.isActive) {
        return res.status(400).json({
          message: `${item.product.name} is no longer available.`,
        });
      }

      if (item.quantity > item.product.stockQuantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}.`,
        });
      }

      const price = item.product.salePrice ?? item.product.price;
      total += Number(price) * item.quantity;
    }

    // Create order, order items, update stock, and clear cart
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
        },
      });

      for (const item of cartItems) {
        const price = item.product.salePrice ?? item.product.price;

        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price,
          },
        });

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return newOrder;
    });

    // Return completed order
    const completeOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Checkout completed successfully.",
      order: completeOrder,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Checkout failed.",
    });
  }
};

module.exports = {
  checkout,
};