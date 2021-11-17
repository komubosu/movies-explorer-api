const { NODE_ENV, BD_PATH } = process.env;

module.exports.mongoosePath = (NODE_ENV === 'production' ? BD_PATH : 'mongodb://localhost:27017/moviesdb');

module.exports.mongooseRules = {
  useNewUrlParser: true,
};
