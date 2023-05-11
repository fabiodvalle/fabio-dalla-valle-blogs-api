const { createToken } = require('../auth/authFunctions');
const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const userExists = await userService.getByEmail(email);
    console.log(userExists);
    if (userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const user = await userService.createUser({ displayName, email, password, image });

    const { password: _password, ...userWithoutPassword } = user.dataValues;

    const token = createToken(userWithoutPassword);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno', error: error.message });
  }
};

module.exports = { createUser };