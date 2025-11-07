# Andrii Vatazhko Donations

Повноцінний монорепо з React фронтом та Node.js/Express бекендом для збору донатів і публікації звітів.

## Стек
- **Frontend:** React 19 + Vite 7
- **Backend:** Node.js 22, Express 5, Mongoose 8
- **Quality:** ESLint (flat config) + Prettier
- **Менеджер пакетів:** Yarn Classic із workspaces

## Структура
```
frontend/  # Vite застосунок із базовим шаблоном
backend/   # Express API + підключення до MongoDB
```

## Скрипти
- `yarn frontend:install` / `yarn backend:install` – інсталяція залежностей для кожної частини
- `yarn install:all` – інсталяція фронту та беку послідовно
- `yarn frontend:dev` / `yarn backend:dev` – запуск у режимі розробки
- `yarn dev` – одночасний запуск фронта і бека
- `yarn lint` – ESLint по всьому монорепо
- `yarn format` – форматування Prettier

## Початок роботи
1. `yarn install` – поставить залежності кореня та workspace-пакетів
2. (Опційно) `cp backend/.env.example backend/.env` та вкажи `MONGO_URI`
3. `yarn dev` – старт фронта та бека

## Environment
- `PORT` – порт бекенда, дефолт `5000`
- `MONGO_URI` – рядок підключення до MongoDB (локально `mongodb://127.0.0.1:27017/donations`)
