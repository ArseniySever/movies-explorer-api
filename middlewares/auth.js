const jwtNew = require('jsonwebtoken');
const { UnauthorizedError } = require('../error/UnauthorizedError');
const { errorMessage } = require('../utils/error');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  try {
    const { jwt } = req.cookies;
    if (!jwt) {
      throw new UnauthorizedError(errorMessage.authorizationMessage);
    }
    let payload;
    try {
      payload = jwtNew.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      throw new UnauthorizedError(errorMessage.authorizationMessage);
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { auth };
