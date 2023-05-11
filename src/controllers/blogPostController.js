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

const getAllPosts = async (req, res) => {
  const posts = await blogPostService.getAllPosts();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.getPostById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
};

module.exports = { insert, getAllPosts, getPostById };