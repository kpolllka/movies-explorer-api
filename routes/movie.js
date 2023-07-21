const routerMovie = require('express').Router();
const { createMovie, getMovie, delMovie } = require('../controllers/movie');
const { validationCreateMovie, validationDelMovie } = require('../utils/validation');

routerMovie.post('/movies', validationCreateMovie, createMovie); // создаем новый фильм
routerMovie.get('/movies', getMovie); // получаем все фильмы, сохраненные текущим пользователем
routerMovie.delete('/movies/:_id', validationDelMovie, delMovie); // удаляем сохраненный фильм по id

module.exports = routerMovie;
