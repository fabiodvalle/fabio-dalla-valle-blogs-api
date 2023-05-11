const blogPostService = require('../services/blogPostService');

const insert = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { data: { id } } = req.payload;

  const categoryExists = await blogPostService.categoryExists(categoryIds);

  if (categoryExists.some((c) => !c)) {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
}
  
  const blogPost = await blogPostService.insert({ title, content, userId: id, categoryIds });

  return res.status(201).json(blogPost);
};

module.exports = { insert };