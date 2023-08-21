const { celebrate, Joi } = require('celebrate');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().regex(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/),
    password: Joi.string().required(),
  }),
});
const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().regex(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    trailerLink: Joi.string().required().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    thumbnail: Joi.string().required().regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

const resumeUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  loginValidation,
  createUserValidation,
  createMovieValidation,
  deleteMovieValidation,
  resumeUserInfoValidation,
};
