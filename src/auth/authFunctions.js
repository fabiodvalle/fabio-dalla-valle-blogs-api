const jwt = require('jsonwebtoken');

const jwtConfig = {
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, verifyToken };