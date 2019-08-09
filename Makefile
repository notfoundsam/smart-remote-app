ALL: up
build:
	docker-compose -f docker-compose.yml build
up:
	docker-compose -f docker-compose.yml up -d
up-dev:
	npm run dev
stop:
	docker-compose stop
prod:
	npm run build-prod
