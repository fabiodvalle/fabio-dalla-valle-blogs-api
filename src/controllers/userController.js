const { createToken } = require('../auth/authFunctions');
const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const userExists = await userService.getByEmail(email);

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

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { data } = req.payload;

  await userService.deleteUser(data.id);

  return res.status(204).end();
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };