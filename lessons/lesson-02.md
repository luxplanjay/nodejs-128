# Заняття 2 — Знайомство з Express

## Express

- Що таке Express і навіщо він потрібен
- Створення сервера з Express
- Роутинг в Express
- Параметри маршруту `req.params`
- Параметри запиту `req.query`

## Middleware

- Що таке middleware та стек middleware
- Оголошення middleware функції `(req, res, next)`
- Middleware для неіснуючих маршрутів (404)
- Middleware обробки помилок `(err, req, res, next)`
- Middleware із бібліотек:
  - Обробка JSON з `express.json()`
  - [`cors`](https://www.npmjs.com/package/cors)
  - [`helmet`](https://www.npmjs.com/package/helmet)

## Змінні оточення

- [`dotenv`](https://www.npmjs.com/package/dotenv)
- Різні повідомлення про помилки для prod та dev середовищ

## Послідовність заняття

1. Встановити Express, створити базовий сервер
2. Додати перший маршрут — показати `req`, `res`
3. Розібрати `req.params` та `req.query` на прикладі
4. Пояснити концепцію middleware — показати стек
5. Написати власний middleware — логування запитів
6. Додати middleware для неіснуючих маршрутів (404)
7. Додати middleware обробки помилок
8. Підключити `express.json()`, `cors`, `helmet`
9. Налаштувати змінні оточення через `dotenv`
10. Показати різні повідомлення про помилки для prod та dev
