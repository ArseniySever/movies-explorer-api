const jwtNew = require('jsonwebtoken');
const { UnauthorizedError } = require('../error/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new UnauthorizedError('Для выполнения действия необходима авторизация');
  }
  const token = cookie.replace('jwt', '');

  let payload;
  try {
    payload = jwtNew.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Для выполнения действия необходима авторизация');
  }
  req.user = payload;

  next();
}

module.exports = { auth };
