const PORT = 4100;
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const salt = 10;
const windowLimit = 15 * 60 * 100;
const windowLimitMax = 100;

module.exports = {
  PORT,
  DB_URL,
  salt,
  windowLimit,
  windowLimitMax,
};
