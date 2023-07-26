const rateLimit = require('express-rate-limit');

const constants = require('../utils/constants');

const {
  windowLimit = constants.windowLimit,
  windowLimitMax = constants.windowLimitMax,
} = process.env;

const limiter = rateLimit({
  windowMs: windowLimit,
  max: windowLimitMax,
});

module.exports = { limiter };
