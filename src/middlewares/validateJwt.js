const { verifyToken } = require('../auth/authFunctions');

const validateJwt = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'A requisição precisa de um token válido' });
    }

    const data = verifyToken(authorization);
    req.payload = data;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno', error: error.message });
  }
};

module.exports = validateJwt;