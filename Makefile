.PHONY: create-network compose-start

DIPLOMA_MYSQL_IMAGE := mysql:latest
DIPLOMA_MYSQL_CONTAINER := diploma-mysql

DIPLOMA_NETWORK := diploma-network

USER_NAME := $(shell whoami)

DATABASE_NAME := diploma
BACKUP_DB_NAME := diploma_db_backup
BACKUP_DB_NAME_PATH := $(shell pwd)/$(BACKUP_DB_NAME).sql
BACKUP_DB_NAME_TAR_GZ := $(shell pwd)/$(BACKUP_DB_NAME).tar.gz

start: create-network compose-start

compose-start:
	DIPLOMA_MYSQL_IMAGE=$(DIPLOMA_MYSQL_IMAGE) \
	DIPLOMA_MYSQL_CONTAINER=$(DIPLOMA_MYSQL_CONTAINER) \
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
	@ if [ -f $(BACKUP_DB_NAME_PATH) ]; then \
		rm $(BACKUP_DB_NAME_PATH); \
	fi
	@ docker exec -it $(DIPLOMA_MYSQL_CONTAINER) sh -c "mysqldump -uroot -proot $(DATABASE_NAME) > $(BACKUP_DB_NAME).sql"
	@ docker cp $(DIPLOMA_MYSQL_CONTAINER):$(BACKUP_DB_NAME).sql $(BACKUP_DB_NAME_PATH)
	@ echo 'Dump created on current folder with name $(BACKUP_DB_NAME).sql!'

apply-dump:
	@ echo 'Applying db dump...'
	@ if [ -f $(BACKUP_DB_NAME_PATH) ]; then \
		docker exec -i $(DIPLOMA_MYSQL_CONTAINER) mysql -uroot -proot $(DATABASE_NAME) < $(BACKUP_DB_NAME).sql; \
		echo 'Dump has been applied!'; \
	else \
		echo 'Dump wasnt found! Aborting.'; \
	fi