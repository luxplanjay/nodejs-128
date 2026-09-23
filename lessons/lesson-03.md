# Заняття 3 — Бази даних і Mongoose

## Бази даних

- Що таке бази даних і навіщо вони потрібні
- MongoDB — документо-орієнтована база даних
- MongoDB Atlas — хмарний хостинг для MongoDB
- MongoDB Compass — GUI для перегляду та керування даними
- Підключення до бази даних через `mongoose.connect`

## Модель даних у MongoDB

- Документ — один запис у колекції
- Поле — властивість документа
- Ідентифікатор — унікальний `_id` кожного документа
- Колекція — набір документів (аналог таблиці)

## Mongoose-схема

- Оголошення схеми через `new Schema({})`
- Типи полів та валідація:
  - `name` — `String`, `required`
  - `age` — `Number`, `required`
  - `onDuty` — `Boolean`, `default: false`
  - `avgMark` — `Number`, `required`
  - `gender` — `String`, `enum: ["male", "female", "other"]`, `required`

## Читання даних

- `Model.find()` — отримати всі документи що відповідають умові
- `Model.findById()` — отримати документ за `_id`, скорочення для `findOne({ _id: id })`
- `Model.findOne()` — отримати перший документ що відповідає умові фільтра
- Різниця між `findById` та `findOne` — `findById` приймає лише `id`, `findOne` приймає будь-який фільтр

## Організація коду

- Middleware
- Роутинг
- Контролери

## Обробка помилок

- Пакет [`http-errors`](https://www.npmjs.com/package/http-errors) — створення HTTP помилок з правильними статусами
- `createHttpError(404, "Not found")` — замість ручного `res.status(404).json(...)`
- Оновлення middleware обробки помилок — отримати `status` та `message` з об'єкта помилки

## Послідовність заняття

1. Пояснити що таке бази даних і чому MongoDB
2. Створити кластер в MongoDB Atlas, підключити MongoDB Compass
3. Підключити Mongoose до проєкту — `mongoose.connect`
4. Пояснити модель даних — документ, поле, колекція, `_id`
5. Створити Mongoose-схему та модель
6. Реалізувати `GET /` — отримати всі документи через `Model.find()`
7. Реалізувати `GET /:id` — отримати документ через `Model.findById()`
8. Показати `Model.findOne()` — пояснити різницю з `findById`
9. Організувати код — розділити на middleware, роутинг, контролери
10. Підключити `http-errors` — замінити ручні помилки на `createHttpError`
11. Оновити middleware обробки помилок — отримувати `status` та `message` з помилки
