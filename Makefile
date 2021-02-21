.PHONY: create-network compose-start

DIPLOMA_MYSQL_IMAGE := mysql:latest
DIPLOMA_MYSQL_CONTAINER := diploma-mysql

DIPLOMA_NETWORK := diploma-network

USER_NAME := $(shell whoami)

DATABASE_NAME := diploma
BACKUP_DB_NAME := diploma_db_backup

start: create-network compose-start

compose-start:
	DIPLOMA_MYSQL_IMAGE=$(DIPLOMA_MYSQL_IMAGE) \
	DIPLOMA_MYSQL_CONTAINER=$(DIPLOMA_MYSQL_CONTAINER) \
	docker-compose up -d

stop:
	docker stop $$(docker ps -aq)

create-network:
	- @ docker network create $(DIPLOMA_NETWORK)

clean:
	docker rm -f $$(docker ps -aq)
	@ docker volume prune -f

restart: compose-start

create-dump:
	docker exec $(DIPLOMA_MYSQL_CONTAINER) -uroot -proot $(DATABASE_NAME) | /bin/gzip > $(BACKUP_DB_NAME).sql.gz /bin/bash