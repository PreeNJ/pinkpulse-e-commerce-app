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