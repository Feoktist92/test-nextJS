# Next.js Auth Dashboard

Веб-приложение на Next.js 16 (App Router) с авторизацией через [DummyJSON](https://dummyjson.com/docs/auth) и автоматическим обновлением JWT токенов.

## Функциональность

- **Root (`/`)** — редирект на `/dashboard` при наличии токенов, иначе на `/login`
- **Login (`/login`)** — форма авторизации (username/password), при успехе — редирект на Dashboard
- **Dashboard (`/dashboard`)** — защищённая страница: данные пользователя, корзины, продукты с пагинацией («Загрузить ещё»), добавление товара в корзину, кнопка «Выйти»

Все запросы к DummyJSON идут через сервер Next.js (Server Actions).

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Тестовые данные для входа

Из [документации DummyJSON](https://dummyjson.com/docs/auth):

- **Username:** `emilys`
- **Password:** `emilyspass`

Можно использовать любые учётные данные из [dummyjson.com/users](https://dummyjson.com/users).
