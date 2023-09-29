const { celebrate, Joi } = require('celebrate');

const regexUrl = /^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i;

const validationCreateUser = celebrate({ // валидация создания нового пользователя
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const validationLogin = celebrate({ // валидация авторизации пользователя
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const validationEditUser = celebrate({ // валидация редактирования данных пользователя
  body: Joi.object().required().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationCreateMovie = celebrate({ // валидация создания нового фильма
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrl),
    trailerLink: Joi.string().required().regex(regexUrl),
    thumbnail: Joi.string().required().regex(regexUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationDelMovie = celebrate({ // валидация удаления сохраненного фильма по id
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationEditUser,
  validationCreateMovie,
  validationDelMovie,
};
