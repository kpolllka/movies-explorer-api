const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const STATUS_CREATE = require('../errors/notErrors'); // 201 - пользователь успешно создан
const BadRequest = require('../errors/BadRequestError'); // 400 - переданы некорректные данные
const NotFoundError = require('../errors/NotFoundError'); // 404 - запрашиваемые данные не найдены
const ConflictError = require('../errors/ConflictError'); // 409 - такой пользователь уже существует

// Создание нового пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(STATUS_CREATE)
      .send({ name: user.name, email: user.email, _id: user._id }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError(err.message));
        return;
      }
      next(err);
    });
};

// Авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      }
    })
    .catch(next);
};

// Получение данных об авторизованном пользователе
const getAuthProfile = (req, res, next) => {
  const owner = req.user._id;

  User.findById(owner)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError(err.message));
        return;
      }
      next(err);
    });
};

// Изменение данных пользователя
const editUser = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(err.message));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError(err.message));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser, editUser, login, getAuthProfile,
};
