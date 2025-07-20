# Messanger

Добро пожаловать в проект **Messanger** — современное приложение для обмена сообщениями.

## О проекте

Messanger — это удобный и быстрый мессенджер, позволяющий общаться в реальном времени. Проект создан для обучения и демонстрации современных технологий веб-разработки.

## Основные возможности

- Регистрация и авторизация пользователей
- Отправка и получение сообщений
- Групповые чаты
- Уведомления о новых сообщениях
- Современный и адаптивный интерфейс

## Технологии

- TypeScript
- Handlebars (шаблонизатор)
- Vite (сборка)
- SCSS (стили)
- Mocha, Chai (тестирование)
- Husky, lint-staged (precommit-хуки)

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/xr1s0nx-wave/middle.messenger.praktikum.yandex.git
   ```
2. Установите зависимости:
   ```bash
   cd middle.messenger.praktikum.yandex
   npm install --legacy-peer-deps
   ```
3. Запустите приложение:
   ```bash
   npm run dev
   ```

## Демо

[Открыть приложение на Netlify](https://deploy-preview-5--messanger-xr1s0nx.netlify.app/)

## Запуск тестов

Для запуска unit-тестов (Mocha + Chai):

```bash
npx mocha -r ts-node/register --extension ts "src/**/*.test.ts"
```

## Precommit

В проекте настроен precommit-хук через Husky и lint-staged. При коммите автоматически запускается линтинг и автофикс кода (eslint, stylelint, prettier).

## Скриншоты

![Чаты](https://github.com/xr1s0nx-wave/messanger/blob/sprint_1/screenshots/chats.png?raw=true)

---
