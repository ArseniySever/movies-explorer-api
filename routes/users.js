const routerUser = require('express').Router();

const {
  resumeProfile,
  resumeNowProfile,
} = require('../controllers/users');

const { resumeUserInfoValidation } = require('../utils/validation');

routerUser.get('/me', resumeNowProfile);

routerUser.patch('/me', resumeUserInfoValidation, resumeProfile);

module.exports = { routerUser };
