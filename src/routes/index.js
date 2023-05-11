const express = require('express');
const login = require('../controllers/login');
const userController = require('../controllers/userController');
const validateJwt = require('../middlewares/validateJwt');
const createUserValidate = require('../middlewares/createUserValidate');
const categoryController = require('../controllers/categoryController');
const createCategoryValidate = require('../middlewares/createCategoryValidate');
const blogPostController = require('../controllers/blogPostController');
const blogPostValidate = require('../middlewares/blogPostValidate');
const updatePostValidate = require('../middlewares/updatePostValidate');

const blogApiRoutes = express.Router();

blogApiRoutes.post('/login', login);
blogApiRoutes.delete('/user/me', validateJwt, userController.deleteUser);
blogApiRoutes.post('/user', createUserValidate, userController.createUser);
blogApiRoutes.get('/user/:id', validateJwt, userController.getUserById);
blogApiRoutes.get('/user', validateJwt, userController.getAllUsers);

blogApiRoutes
  .post('/categories', validateJwt, createCategoryValidate, categoryController.createCategory);
blogApiRoutes.get('/categories', validateJwt, categoryController.getAllCategories);

blogApiRoutes.get('/post/search', validateJwt, blogPostController.searchPost);
blogApiRoutes.post('/post', validateJwt, blogPostValidate, blogPostController.insert);
blogApiRoutes.get('/post/:id', validateJwt, blogPostController.getPostById);
blogApiRoutes.get('/post', validateJwt, blogPostController.getAllPosts);
blogApiRoutes.put('/post/:id', validateJwt, updatePostValidate, blogPostController.updatePost);
blogApiRoutes.delete('/post/:id', validateJwt, blogPostController.deletePost);

module.exports = blogApiRoutes;