const { Category } = require('../models');

const createCategory = ({ name }) => Category.create({ name });

const getAllCategories = () => Category.findAll();

const getCategoryById = (id) => Category.findOne({ where: { id } });

module.exports = { createCategory, getAllCategories, getCategoryById };