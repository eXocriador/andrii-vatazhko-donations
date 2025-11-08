# Andrii Vatazhko Donations

Повноцінний монорепо з React фронтом та Node.js/Express бекендом для збору донатів і публікації звітів.

## Стек
- **Frontend:** React 19 + Vite 7 + TypeScript + React Router DOM
- **Backend:** Node.js 22 (Express 5, Mongoose 8, TypeScript)
- **Quality:** ESLint (flat config) + Prettier
- **Менеджер пакетів:** Yarn Classic із workspaces

## Структура
```
frontend/  # Vite застосунок: окремі сторінки (Головна, Про збір, Збори, Реквізити)
backend/   # Express API + підключення до MongoDB
```

## Скрипти
- `yarn frontend:install` / `yarn backend:install` – інсталяція залежностей для кожної частини
- `yarn install:all` – встановлює фронт та бекендерські пакети послідовно
- `yarn frontend:dev` / `yarn backend:dev` – TS Dev сервери (Vite / tsx watch)
- `yarn dev` – одночасно стартує фронт і бек
- `yarn frontend:build` / `yarn backend:build` – продакшн збірки (Vite build + tsc)
- `yarn build` – запускає обидві збірки
- `yarn lint` – ESLint по всьому монорепо
- `yarn format` – форматування Prettier

## Початок роботи
1. `yarn install` – поставить залежності кореня та workspace-пакетів
2. (Опційно) `cp backend/.env.example backend/.env` та вкажи `MONGO_URI`
3. `yarn dev` – старт фронта та бека
4. Хочеш своє фон-зображення? Додай його до `:root { --app-bg-image: url('...'); }` у `frontend/src/index.css`.

## Environment
- `PORT` – порт бекенда, дефолт `5000`
- `MONGO_URI` – рядок підключення до MongoDB (локально `mongodb://127.0.0.1:27017/donations`)
