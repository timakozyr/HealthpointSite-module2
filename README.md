# Запуск приложения
Клонируем репозиторий
```
git clone https://github.com/timakozyr/HealthpointSite-module2.git
```
Для запуска приложения потребуются две консоли: для фронтенда и бэкенда.
## Бэкенд
Перейдем в репозиторий
```
cd backend
```
Там настроим окружение
```
virtualenv venv
source venv/bin/activate
```
Запустим файл с командами для подготовки базы данных
```
sh generate.sh
```
Поднимем бэкенд
```
python manage.py runserver
```
## Фронтенд
Перейдем в репозиторий
```
cd HealthpointSite
```
Забилдим и поднимем фронтенд
```
npm install --legacy-peer-deps
npm run build
npm start
```
