require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoosePath, mongooseRules } = require('./middlewares/mongoose-settings');
const centralizedErrorHandler = require('./middlewares/errors-handler');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(mongoosePath, mongooseRules)
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.use(require('./middlewares/rate-limiter'));

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
