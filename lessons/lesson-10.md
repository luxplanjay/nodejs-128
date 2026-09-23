# Заняття 10 — Завантаження зображень

## Передача файлів

- `multipart/form-data` — формат для передачі файлів через HTTP
- Багаточастинність — запит складається з кількох частин (текст + файли)
- Відмінність від `application/json` — не можна передати файл через JSON

## Аватар користувача

- Додати властивість `avatar` до моделі `User`
- `https://ac.goit.global/fullstack/react/default-avatar.jpg` — аватар за замовчуванням якщо користувач не завантажив свій
- Маршрут `PATCH /users/me/avatar`
- Бібліотека [`multer`](https://www.npmjs.com/package/multer) — обробка `multipart/form-data`
  - Збереження файлів у пам'ять через `memoryStorage`
  - Налаштування middleware
  - Підключення middleware до маршруту
- Робота з файлом у контролері через `req.file`

## Хмарне сховище Cloudinary

- [Cloudinary](https://cloudinary.com/) — хмарне сховище для зображень
- Налаштування через змінні оточення — `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Налаштування `cloudinary` в проєкті
- Функція завантаження файлу на Cloudinary — отримати URL завантаженого зображення
- Використання функції у контролері — зберегти URL в полі `avatar` користувача

## Стартові файли у проєкті

- `assets/default-avatar.jpg` — аватар за замовчуванням

## Послідовність заняття

1. Пояснити `multipart/form-data` — показати різницю з JSON через Postman
2. Додати поле `avatar` до моделі `User` з дефолтним значенням з `assets/default-avatar.jpg`
3. Створити маршрут `PATCH /users/me/avatar`
4. Встановити та налаштувати `multer` з `memoryStorage`
5. Підключити middleware до маршруту — показати `req.file` у контролері
6. Зареєструватись у Cloudinary — отримати credentials
7. Налаштувати Cloudinary через змінні оточення
8. Написати функцію завантаження файлу на Cloudinary
9. Використати функцію у контролері — зберегти URL аватара
10. Протестувати через Postman — завантажити аватар та перевірити URL у відповіді
