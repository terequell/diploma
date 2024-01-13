Bachelor's degree diploma "Web-application for learning english words".

Frontend: React + TypeScript, Axios, Antd.

Backend: JavaScript + Express, mysql2.

You can deploy application in Docker with some bash scripts i wrote in Makefile. Last time app was deployed using Docker v20.10.3. Order of make commands:
1) make start
2) in different tab - make backend (it launchs service in watch mode)
3) in different tab - make frontend (it launchs service in watch mode)

I implemented DB backup to remote server when i actively was developing the project.
Unfortunately, i lost the DB dump, but if you're interested, i can try to searh it in my disk.

_________________________________________________________________________

Код дипломной работы - "Веб-приложение для изучения английских слов".

Фронт написан на React + TypeScript, для запросов используется axios. Некоторые компоненты брались из AntDesign.

Бэк написан на JavaScript + ExpressJS, для запросов в бд используется либа mysql2.

Всё разворачивается в докер-контейнерах, для удобства написан небольшой Makefile.

Версия Докера, на которой точно работает - 20.10.3.

Порядок разворачивания следующий:
1. make start
2. В новой вкладке терминала, т.к работает watch - make backend
3. В новой вкладке терминала по той же причине- make frontend

Дамп БД будет добавлен позже, он качается с удаленного файлового сервера (который уже не работает), но при желании дамп можно самому вручную 
скачать и подсунуть в БД.

