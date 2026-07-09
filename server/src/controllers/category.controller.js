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

// CREATE category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create category.",
    });
  }
};

// GET single category
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch category.",
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
};