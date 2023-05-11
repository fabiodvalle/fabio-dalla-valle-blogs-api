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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { data } = req.payload;

  const { userId } = await blogPostService.getPostById(id);

  if (userId !== data.id) return res.status(401).json({ message: 'Unauthorized user' });

  const updatedPost = await blogPostService.updatePost(title, content, id);

  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { data } = req.payload;

  const post = await blogPostService.getPostById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  if (post.userId !== data.id) return res.status(401).json({ message: 'Unauthorized user' });

  await blogPostService.deletePost(id);

  return res.status(204).end();
};

module.exports = { insert, getAllPosts, getPostById, updatePost, deletePost };