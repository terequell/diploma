.PHONY: create-network compose-start

DIPLOMA_MYSQL_IMAGE := mysql:latest
DIPLOMA_MYSQL_CONTAINER := diploma-mysql
DIPLOMA_FRONTEND_IMAGE := node:12
DIPLOMA_FRONTEND_CONTAINER := diploma-frontend
DIPLOMA_BACKEND_IMAGE := node:12
DIPLOMA_BACKEND_CONTAINER := diploma-backend

DIPLOMA_FRONTEND_PATH := /home/alexey/reps/diploma/frontend
DIPLOMA_BACKEND_PATH := /home/alexey/reps/diploma/backend

DIPLOMA_NETWORK := diploma-network

USER_NAME := $(shell whoami)

DATABASE_NAME := diploma

BACKUP_DB_NAME := diploma_db_backup.sql
BACKUP_DB_NAME_LOCAL_PATH := $(shell pwd)/$(BACKUP_DB_NAME)

start: create-network compose-start

compose-start:
	DIPLOMA_MYSQL_IMAGE=$(DIPLOMA_MYSQL_IMAGE) \
	DIPLOMA_MYSQL_CONTAINER=$(DIPLOMA_MYSQL_CONTAINER) \
	DIPLOMA_FRONTEND_IMAGE=$(DIPLOMA_FRONTEND_IMAGE) \
	DIPLOMA_FRONTEND_CONTAINER=$(DIPLOMA_FRONTEND_CONTAINER) \
	DIPLOMA_FRONTEND_PATH=$(DIPLOMA_FRONTEND_PATH) \
	DIPLOMA_BACKEND_IMAGE=$(DIPLOMA_BACKEND_IMAGE) \
	DIPLOMA_BACKEND_CONTAINER=$(DIPLOMA_BACKEND_CONTAINER) \
	DIPLOMA_BACKEND_PATH=$(DIPLOMA_BACKEND_PATH) \
	docker-compose up -d

stop:
	@ docker stop $$(docker ps -aq)

create-network:
	- @ docker network create $(DIPLOMA_NETWORK)

clean:
	@ docker rm -f $$(docker ps -aq)
	@ docker volume prune -f

restart: compose-start

create-dump:
	@ echo 'Creating db dump... Previous dump will be removed.'
	@ if [ -f $(BACKUP_DB_NAME_LOCAL_PATH) ]; then \
		rm $(BACKUP_DB_NAME_LOCAL_PATH); \
	fi
	@ docker exec -it $(DIPLOMA_MYSQL_CONTAINER) sh -c "mysqldump -uroot -proot $(DATABASE_NAME) > $(BACKUP_DB_NAME)"
	@ docker cp $(DIPLOMA_MYSQL_CONTAINER):$(BACKUP_DB_NAME) $(BACKUP_DB_NAME_LOCAL_PATH)
	@ echo 'Dump created on current folder with name $(BACKUP_DB_NAME)!'

apply-dump:
	@ echo 'Applying db dump...'
	@ if [ -f $(BACKUP_DB_NAME_LOCAL_PATH) ]; then \
		docker exec -i $(DIPLOMA_MYSQL_CONTAINER) mysql -uroot -proot $(DATABASE_NAME) < $(BACKUP_DB_NAME); \
		echo 'Dump has been applied!'; \
	else \
		echo 'Dump wasnt found! Aborting.'; \
	fi

frontend: frontend-install frontend-start
backend: backend-install backend-start

frontend-install:
	docker exec -it $(DIPLOMA_FRONTEND_CONTAINER) npm i
frontend-start:
	docker exec -it $(DIPLOMA_FRONTEND_CONTAINER) npm run start

backend-install:
	docker exec -it $(DIPLOMA_BACKEND_CONTAINER) npm i
backend-start:
	docker exec -it $(DIPLOMA_BACKEND_CONTAINER) npm run start