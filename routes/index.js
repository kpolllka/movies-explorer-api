const router = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movie');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validationCreateUser, validationLogin } = require('../utils/validation');

router.post('/signup', validationCreateUser, createUser); // роутер регистрации нового пользователя
router.post('/signin', validationLogin, login); // роутер авторизации пользователя
router.use(auth);

router.use(routerUser); // другие роутеры пользователя
router.use(routerMovie); // другие роутеры фильмов

// роутер, выдающий ошибку, при неправильном адресе запроса
router.use((req, res, next) => next(new NotFoundError('Запрашиваемые данные не найдены')));

module.exports = router;
