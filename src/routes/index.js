const express = require('express');
const login = require('../controllers/login');
const userController = require('../controllers/userController');
const validateJwt = require('../middlewares/validateJwt');
const createUserValidate = require('../middlewares/createUserValidate');

const blogApiRoutes = express.Router();

blogApiRoutes.post('/login', login);
blogApiRoutes.post('/user', createUserValidate, userController.createUser);
blogApiRoutes.get('/user', validateJwt, userController.getAllUsers);

module.exports = blogApiRoutes;