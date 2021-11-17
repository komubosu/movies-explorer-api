# movies-explorer-api
## Бэкенд часть приложения по поиску фильмов.
## Доступ к api - `https://api.komubosu.films.nomoredomains.rocks/`

---

## Работа api

### Пользователь
* `POST /signup` - Регистариця нового пользователя. Принимает `email`, `password` и `name`. В ответе возвращает `email` и `name`.
* `POST /signin` - Вход в созданный аккаунт. Принимает `email` и `password`. В ответе возвращает `email`, `name` и записывает `jwt` в куки.
* `POST /signout` - Выход из аккаунта. Удаляет `jwt` из куки.
* `GET /users/me` - Возвращает информацию о пользователе. В ответе возвращает `email` и `name`.
* `PATCH /users/me` - Обновляет информацию о пользователе. В ответе возвращает `email` и `name`.

### Фильмы
* `GET /movies` - Возвращает все сохранные пользователем фильмы. В ответе возвращает объект с n-м количеством **фильмов**, один **фильм** содержит `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `thumbnail`, `owner`, `movieId`, `nameRU` и `nameEN`.
* `POST /movies` - Сохраняет фильм в избранное. Принимает `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `thumbnail`, `movieId`, `nameRU` и `nameEN`. В ответе возвращает `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `thumbnail`, `owner`, `movieId`, `nameRU` и `nameEN`.
* `GET /movies/:movieId` - Удаляет фильм из избранного. В ответе возвращает `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `thumbnail`, `owner`, `movieId`, `nameRU` и `nameEN`.

## Статусы ошибок
* `400 Bad Request` - Неверный запрос.
* `401 Unauthorized` - Не хватает прав для запроса.
* `403 Forbidden` - Не хватает прав для действия.
* `404 Not Found` - Сервер не может найти данные согласно запросу.
* `409 Conflict` - Конфликт между запросом пользователя и сервером.
* `500 Internal Server Error` - Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос.

---

## NPM Модули
* `express`
* `express-winston`
* `winston`
* `mongoose`
* `body-parser`
* `cookie-parser`
* `dotenv`
* `validator`
* `celebrate`
* `cors`
* `bcryptjs`
* `crypto-js`
* `jsonwebtoken`
