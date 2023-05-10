const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { data: token } = req.payload;
    const userExists = userService.getByEmail(email);
    if (!userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }

    await userService.createUser({ displayName, email, password, image });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno', error: error.message });
  }
};

module.exports = { createUser };