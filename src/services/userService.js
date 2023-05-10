const bcrypt = require('bcryptjs');
const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ displayName, email, password, image }) => {
  const salt = bcrypt.genSaltSync(5);
  const encryptedPassword = bcrypt.hashSync(password, salt);
  return User.create({ displayName, email, password: encryptedPassword, image });
};

module.exports = {
  createUser,
  getByEmail,
};