const prisma = require("../config/prisma");

// CHECKOUT
const checkout = async (req, res) => {
  try {
    // We'll build this together
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Checkout failed.",
    });
  }
};

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
};

// GET SINGLE ORDER
const getOrderById = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order.",
    });
  }
};

module.exports = {
  checkout,
  getOrders,
  getOrderById,
};