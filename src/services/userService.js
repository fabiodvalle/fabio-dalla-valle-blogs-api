const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ displayName, email, password, image }) => User
  .create({ displayName, email, password, image });

const getAllUsers = () => User.findAll(
  { attributes: { exclude: ['password'] } },
);

const getUserById = (id) => User.findOne(
  { 
    where: { id },
    attributes: { exclude: ['password'] },
  },
);

module.exports = {
  createUser,
  getByEmail,
  getAllUsers,
  getUserById,
};