const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: [true, 'поле "country" должно быть заполнено'],
  },
  director: { // режиссёр фильма
    type: String,
    required: [true, 'поле "director" должно быть заполнено'],
  },
  duration: { // длительность фильма
    type: Number,
    required: [true, 'поле "duration" должно быть заполнено'],
  },
  year: { // год выпуска фильма
    type: String,
    required: [true, 'поле "year" должно быть заполнено'],
  },
  description: { // описание фильма
    type: String,
    required: [true, 'поле "description" должно быть заполнено'],
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: { // ссылка на трейлер фильма
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: { // ссылка на миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: [true, 'поле "movieId" должно быть заполнено'],
  },
  nameRU: { // название фильма на русском языке
    type: String,
    required: [true, 'поле "nameRU" должно быть заполнено'],
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: [true, 'поле "nameEN" должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
