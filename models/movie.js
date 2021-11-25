const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: '',
  },
  director: {
    type: String,
    required: true,
    default: '',
  },
  duration: {
    type: Number,
    required: true,
    default: '',
  },
  year: {
    type: String,
    required: true,
    default: '',
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
    default: '',
    validate: {
      validator: (v) => {
        /^https?:\/\/(www\.)?([a-z0-9]{1}[a-z0-9-]*\.?)*\.{1}[a-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v);
      },
      message: (props) => `${props.value} это не валидный url!`,
    },
  },
  trailer: {
    type: String,
    required: true,
    default: '',
    validate: {
      validator: (v) => {
        /^https?:\/\/(www\.)?([a-z0-9]{1}[a-z0-9-]*\.?)*\.{1}[a-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v);
      },
      message: (props) => `${props.value} это не валидный url!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    default: '',
    validate: {
      validator: (v) => {
        /^https?:\/\/(www\.)?([a-z0-9]{1}[a-z0-9-]*\.?)*\.{1}[a-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v);
      },
      message: (props) => `${props.value} это не валидный url!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: '',
  },
  movieId: {
    type: String,
    required: true,
    default: '',
  },
  nameRU: {
    type: String,
    required: true,
    default: '',
  },
  nameEN: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('movie', movieSchema);
