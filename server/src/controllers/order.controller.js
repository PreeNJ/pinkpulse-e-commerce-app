const prisma = require("../config/prisma");

// CHECKOUT
const checkout = async (req, res) => {
  try {
    res.status(200).json({
      message: "Checkout endpoint coming next.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Checkout failed.",
    });
  }
};

// GET USER ORDERS
const getOrders = async (req, res) => {
  try {
    res.status(200).json([]);
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
    res.status(200).json({});
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