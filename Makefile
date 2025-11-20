.PHONY: build up down logs clean deploy

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	docker system prune -f

deploy:
	./deploy/easypanel_deploy.sh

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && npm run dev

install:
	cd frontend && npm install
	cd backend && npm install
