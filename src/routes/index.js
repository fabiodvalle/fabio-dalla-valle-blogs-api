const express = require('express');
const login = require('../controllers/login');
const userController = require('../controllers/userController');
const validateJwt = require('../middlewares/validateJwt');
const createUserValidate = require('../middlewares/createUserValidate');
const categoryController = require('../controllers/categoryController');
const createCategoryValidate = require('../middlewares/createCategoryValidate');

const blogApiRoutes = express.Router();

blogApiRoutes.post('/login', login);
blogApiRoutes.post('/user', createUserValidate, userController.createUser);
blogApiRoutes.get('/user/:id', validateJwt, userController.getUserById);
blogApiRoutes.get('/user', validateJwt, userController.getAllUsers);

blogApiRoutes
  .post('/categories', validateJwt, createCategoryValidate, categoryController.createCategory);

module.exports = blogApiRoutes;