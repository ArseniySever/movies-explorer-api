const { codeStatus } = require('../utils/error');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatus.authorizationCode;
  }
}
module.exports = {
  UnauthorizedError,
};
