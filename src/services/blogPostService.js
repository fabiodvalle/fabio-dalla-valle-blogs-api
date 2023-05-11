const { BlogPost, PostCategory, sequelize } = require('../models');
const categoryService = require('./categoryService');

const categoryExists = async (categoryIds) => {
  const categoryId = await Promise.all(categoryIds.map(async (c) => {
    const category = await categoryService.getCategoryById(c);
    return !(!category);
  }));
  return categoryId;
};

const insert = async ({ title, content, userId, categoryIds }) => {
  const result = await sequelize.transaction(async (t) => {
    const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    await Promise.all(categoryIds
      .map(async (categoryId) => PostCategory
        .create({ categoryId, postId: blogPost.id }, { transaction: t })));
    return blogPost;
  });

  return result;
};

module.exports = { insert, categoryExists };