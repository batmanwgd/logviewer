up-backend:
	docker-compose up -d --force-recreate backend

up-frontend:
	docker-compose up -d --force-recreate frontend

up: up-backend up-frontend

logs:
	docker-compose logs -f

install-backend:
	docker-compose run --rm backend "npm install"

install-frontend:
	docker-compose run --rm frontend "npm install"

install: install-backend install-frontend

into-backend:
	docker-compose exec backend bash

into-frontend:
	docker-compose exec frontend bash

lint-backend:
	docker-compose run --rm backend "npm run lint"

lint-frontend:
	docker-compose run --rm frontend "npm run lint"

lint: lint-backend lint-frontend

test-backend:
	docker-compose run --rm backend "npm test -- --verbose"

test-frontend:
	docker-compose run --rm frontend "npm tets -- --verbose"

test: test-backend test-forntend

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
