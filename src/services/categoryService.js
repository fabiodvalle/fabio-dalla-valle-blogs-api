const { Category } = require('../models');

const createCategory = ({ name }) => Category.create({ name });

const getAllCategories = () => Category.findAll();

module.exports = { createCategory, getAllCategories };