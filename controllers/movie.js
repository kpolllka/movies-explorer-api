const Movie = require('../models/movie');

const STATUS_CREATE = require('../errors/notErrors'); // 201 - карточка успешно создана
const BadRequest = require('../errors/BadRequestError'); // 400 - переданы некорректные данные
const ForbiddenError = require('../errors/ForbiddenError'); // 403 - ошибка прав доступа
const NotFoundError = require('../errors/NotFoundError'); // 404 - запрашиваемые данные не найдены

// Создание нового фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerID = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerID,
  })
    .then((movie) => res.status(STATUS_CREATE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
        return;
      }
      next(err);
    });
};

// Получение всех фильмов сохраненных пользователем
const getMovie = (req, res, next) => {
  const ownerID = req.user._id;

  Movie.find({ owner: ownerID })
    .then((movie) => res.send(movie))
    .catch(next);
};

// Удаление фильма по id
const delMovie = (req, res, next) => {
  const movieId = req.params._id;
  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail((err) => new NotFoundError(err))
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        Movie.deleteOne(movie)
          .then(() => res.send(movie))
          .catch(next);
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления');
      }
    })
    .catch(next);
};

module.exports = { createMovie, getMovie, delMovie };
