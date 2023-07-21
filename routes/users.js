const routerUser = require('express').Router();
const { editUser, getAuthProfile } = require('../controllers/users');
const { validationEditUser } = require('../utils/validation');

routerUser.get('/users/me', getAuthProfile); // получаем данные об авторизованном пользователе
routerUser.patch('/users/me', validationEditUser, editUser); // редактируем данные пользователя

module.exports = routerUser;
