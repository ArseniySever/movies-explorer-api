const { codeStatus } = require('../utils/error');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = codeStatus.lostCode;
  }
}
module.exports = {
  NotFoundError,
};
