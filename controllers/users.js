const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { User } = require('../models/user');
const { ConflictError } = require('../error/ConflictError');
const { ValidationError } = require('../error/ValidationError');
const { NotFoundError } = require('../error/NotFoundError');
const { UnauthorizedError } = require('../error/UnauthorizedError');
const { ForbiddenError } = require('../error/ForbiddenError');

const configDefault = require('../utils/constants');
const { errorMessage } = require('../utils/error');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(req.body.password, configDefault.salt)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          res.status(201).send({
            email: user.email,
            name: user.name,
            _id: user._id,

          });
        })
        .catch((err) => {
          if (err.name === 'CastError' || err.name === 'Validation failed') {
            next(new ValidationError(errorMessage.wrongDataField));
            return;
          } if (err.code === 11000) {
            next(new ConflictError(errorMessage.userCreated));
            return;
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const resumeProfile = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        next(new ForbiddenError(errorMessage.notFoundUserMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotFoundError(errorMessage.errorNotFound));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new UnauthorizedError('Incorrect data');
      } return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильная почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          return res.cookie('jwt', token, {
            maxAge: 604800000,
            httpOnly: true,
            sameSite: 'None',
            secure: true,
          }).send({ token });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch(next);
};

const resumeNowProfile = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.send({
        email: user.email,
        name: user.name,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Invalid id'));
      } else {
        next(err);
      }
    });
};

const out = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Вы успешно вышли из аккаунта' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  resumeProfile,
  login,
  resumeNowProfile,
  out,
};
