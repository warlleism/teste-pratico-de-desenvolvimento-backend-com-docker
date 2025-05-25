## Instalação

```bash
$ npm install
```

## Rodas aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#create dabase/table
$ npx prisma migrate dev --name criando first migration
```

## Correção de .env

```bash
# fix-getting-environment-variable-not-found
$ npx prisma db push

```

## DOCKER

## 1॰ - DOCKER - Docker Compose - Base de dados

```bash

$ docker-compose up -d

$ docker exec -it my-postgres psql -U postgres
# senha = 4321 - definida no docker compose

$ CREATE DATABASE tasks;

#ps: utilize o #1 - DATABASE_URL em .env para rodar migrations
$ npx prisma migrate dev --name criando first migration

```

## 2॰ - DOCKER - Dockerfile - Buildar em docker API

```bash

#ps: utilize o #2 - DATABASE_URL em .env para build do dockerfile
$ docker build -t dikma/dikmadocker .

$ docker run -p 3000:3000 dikma/dikmadocker

```

## Testes

```bash

$ npm run test

```

## Endpoints

```bash

Em un cenário real utilizaria alguma tecnologia para documentação como Postman ou Swaggeer.

------------------------------------------------------------------------------------------

$ POST /tarefas

$ GET /tarefas

#ou (dados paginados)

$ GET /tarefas?page=1&pageSize=10

$ GET /tarefas/:id

$ PATCH /tarefas/:id

$ DELETE /tarefas/:id

```
