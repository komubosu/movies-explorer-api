# movies-explorer-api
## Бэкенд часть приложения по поиску фильмов.

* [Настройка](#setup)
* [Работа api](#api)
* [Статусы ошибок](#errors)
* [NPM Модули](#npm)

---

<h2 name="setup">Настройка</h2>

0. Для управления базами данных приложение использует MongoDB

1. Клонировать репозиторий

    ```bash
    git clone https://github.com/komubosu/movies-explorer-api.git
    ```

2. Установить зависимости

    ```bash
    npm i
    ```

3. Запустить MongoDB

    ```bash
    mongod
    ```

3. Запустить виртуальный сервер
    > доступ к бэкенду осуществляется по http://localhost:3001/

    ```bash
    npm run start
    ```

4. Вы превосходны!

---

<h2 name="api">Работа api</h2>

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

---

<h2 name="errors">Статусы ошибок</h2>

* `400 Bad Request` - Неверный запрос.
* `401 Unauthorized` - Не хватает прав для запроса.
* `403 Forbidden` - Не хватает прав для действия.
* `404 Not Found` - Сервер не может найти данные согласно запросу.
* `409 Conflict` - Конфликт между запросом пользователя и сервером.
* `500 Internal Server Error` - Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос.

---

<h2 name="npm">NPM Модули</h2>

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
