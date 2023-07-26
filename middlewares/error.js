const { codeStatus, errorMessage } = require('../utils/error');

module.exports = (err, req, res, next) => {
  const { statusCode = codeStatus.serverBrokeCode } = err;
  let { message } = err;
  if (statusCode === codeStatus.serverBrokeCode) {
    message = errorMessage.errorNotFound;
  }
  res.status(statusCode).send({ message });
  next();
};
