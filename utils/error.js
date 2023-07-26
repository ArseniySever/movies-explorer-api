const errorMessage = {
  userCreated: 'Пользователь с таким email уже существует',
  movieCreated: 'Фильм с таким id уже существует',
  forbiddenMessage: 'Нет прав для выполнения действия',
  notFoundUserMessage: 'Пользователь не найден',
  nitFoundMovieMessage: 'Фильм не найден',
  notPageFoundMessage: 'Адрес запроса некорректный',
  errorLoginMessage: 'Неверные данные для логина',
  authorizationMessage: 'Для выполнения действия необходима авторизация',
  wrongDataField: 'Неверные данные в поле',
  errorNotFound: 'Ошибка на сервере',
};
const codeStatus = {
  conflictCode: 409,
  forbiddenCode: 403,
  lostCode: 404,
  authorizationCode: 401,
  validationCode: 400,
  serverBrokeCode: 500,
};

module.exports = {
  codeStatus,
  errorMessage,
};
