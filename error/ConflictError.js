const { codeStatus } = require('../utils/error');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatus.conflictCode;
  }
}
module.exports = {
  ConflictError,
};
