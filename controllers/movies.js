const Movie = require('../models/movie');

const { ValidationError } = require('../error/ValidationError');
const { ForbiddenError } = require('../error/ForbiddenError');
const { NotFoundError } = require('../error/NotFoundError');
const { errorMessage } = require('../utils/error');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res
      .send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(errorMessage.movieCreated));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessage.nitFoundMovieMessage);
      }
      const ownerId = movie.owner.id;
      const userId = req.user._id;
      if (ownerId !== userId) {
        throw new ForbiddenError(errorMessage.forbiddenMessage);
      }
      Movie.findByIdAndRemove(movieId)
        .then(() => res.send({ data: movie }))
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getMovies,
  deleteMovieById,
  createMovie,
};
