const router = require('express').Router();
const { addMovieValidation, removeMovieValidation } = require('../middlewares/validation');
const {
  getMovies,
  addMovie,
  removeMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', addMovieValidation, addMovie);

router.delete('/:movieId', removeMovieValidation, removeMovie);

module.exports = router;
