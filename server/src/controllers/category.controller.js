const prisma = require("../config/prisma");

// GET all categories
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch categories.",
    });
  }
};