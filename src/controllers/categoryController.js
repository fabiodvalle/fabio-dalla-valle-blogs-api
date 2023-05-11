const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    const category = await categoryService.createCategory({ name });

    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno', error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  const allCategories = await categoryService.getAllCategories();

  return res.status(200).json(allCategories);
};

module.exports = { createCategory, getAllCategories };