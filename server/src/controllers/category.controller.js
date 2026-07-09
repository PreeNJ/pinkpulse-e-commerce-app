// UPDATE category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update category.",
    });
  }
};

// DELETE category
const deleteCategory = async (req, res) => {
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

    await prisma.category.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete category.",
    });
  }
};