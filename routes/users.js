const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  resumeProfile,
  resumeNowProfile,
} = require('../controllers/users');

router.get('/me', resumeNowProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), resumeProfile);

module.exports = router;
