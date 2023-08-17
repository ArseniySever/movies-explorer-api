const routerMovie = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

routerMovie.get('/', getMovies);

routerMovie.post('/', createMovieValidation, createMovie);

routerMovie.delete('/:movieId', deleteMovieValidation, deleteMovieById);

module.exports = { routerMovie };
