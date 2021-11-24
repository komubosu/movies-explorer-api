const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

const handleError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequestError('Переданы некорректные данные'));
  } else {
    next(err);
  }
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err, next));
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => handleError(err, next));
};

module.exports.removeMovie = (req, res, next) => {
  const { owner } = req.user._id;
  const { movieId } = req.params;

  Movie.find({ movieId, owner })
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Фильм с указанным movieId не найден');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('У вас нет прав удалить фильм из избранного');
      }
      return Movie.findAndRemove({ movieId, owner });
    })
    .then((movie) => res.send(movie))
    .catch((err) => handleError(err, next));
};
