const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', login);
app.post('/signup', createUser);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://krismesto.nomoredomainsrocks.ru/',
  'https://krismesto.nomoredomainsrocks.ru/',
  'localhost:3000'
];

app.use((err, req, res) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

    // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

    // Если это предварительный запрос, добавляем нужные заголовки
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    }

    // сохраняем список заголовков исходного запроса
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы с этими заголовками
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }

    res
      .status(statusCode)
      .send({
        // проверяем статус и выставляем сообщение в зависимости от него
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });

  }


});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
