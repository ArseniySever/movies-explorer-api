const { codeStatus } = require('../utils/error');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatus.forbiddenCode;
  }
}
module.exports = {
  ForbiddenError,
};
