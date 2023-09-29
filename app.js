require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes');
const errorHandler = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();
app.use(cors());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(helmet()); // защита приложения от уязвимостей и кибератак, включая CSRF, XSS и др.
app.use(requestLogger); // подключили логгер запросов
app.use(limiter); // подключили лимитер запросов для ограничения кол-ва запросов к API

app.use(router); // подключили обработку роутов
app.use(errorLogger); // подключили логгер ошибок

app.use(errors()); // подключили обработку ошибок сервера
app.use(errorHandler); // подключили обработку ошибок сервера

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // если всё работает, консоль покажет, какой порт приложение слушает
});
