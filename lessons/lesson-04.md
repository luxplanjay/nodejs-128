# Заняття 4 — CRUD операції

## GET (Read)

`GET /students` — отримати всі записи

- Тіла запиту немає
- `200` + колекція — якщо все ок (навіть якщо колекція порожня)

`GET /students/:studentId` — отримати один запис за ID

- Тіла запиту немає
- Параметр у URL (`req.params.studentId`)
- `200` + документ — якщо все ок
- `404` + помилка — якщо документ не знайдено

## POST (Create)

`POST /students` — створити новий запис

- Тіло запиту (`req.body`) містить дані для створення ресурсу
- `201` + документ — якщо все ок
- Метод `Model.create()`

## DELETE (Delete)

`DELETE /students/:studentId` — видалити запис за ID

- Тіла запиту немає
- `200` + видалений документ — якщо все ок
- `404` + помилка — якщо документ не знайдено
- Метод `Model.findOneAndDelete()`

## PATCH (Update)

`PATCH /students/:studentId` — часткове оновлення запису

- Тіло запиту містить лише ті поля які потрібно оновити
- `200` + оновлений документ — якщо все ок
- `404` + помилка — якщо документ не знайдено
- Метод `Model.findOneAndUpdate()`

## PUT (Update/Create)

`PUT /students/:studentId` — повне оновлення або створення запису

- Тіло запиту містить всі поля ресурсу, навіть якщо деякі не змінюються
- Якщо ресурс існує — оновити, якщо ні — створити (`upsert: true`)
- PUT = PATCH + POST
- Метод `Model.findOneAndUpdate()` з опцією `upsert: true`

## Послідовність заняття

1. Реалізувати `GET /students` — отримати всі документи
2. Реалізувати `GET /students/:studentId` — отримати документ за ID, обробити 404
3. Реалізувати `POST /students` — створити документ через `Model.create()`
4. Реалізувати `DELETE /students/:studentId` — видалити через `Model.findOneAndDelete()`
5. Реалізувати `PATCH /students/:studentId` — часткове оновлення через `Model.findOneAndUpdate()`
6. Реалізувати `PUT /students/:studentId` — повне оновлення з `upsert: true`
7. Протестувати всі ендпоінти через Postman
