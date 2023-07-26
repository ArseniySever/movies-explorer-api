const { codeStatus } = require('../utils/error');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatus.validationCode;
  }
}
module.exports = {
  ValidationError,
};
