const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleError = (err, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequestError('Переданы некорректные данные'));
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    next(new ConflictError('Этот email уже используется'));
  } else {
    next(err);
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => handleError(err, next));
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }

      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => handleError(err, next));
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch((err) => handleError(err, next));
};

module.exports.signout = (req, res, next) => {
  res
    .clearCookie('jwt', {
      sameSite: 'none',
      secure: true,
    })
    .send({ message: 'Вы успешно вышли из аккаунта' })
    .catch((err) => handleError(err, next));
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => handleError(err, next));
};
