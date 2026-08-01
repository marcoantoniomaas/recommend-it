# Recommend It

Quero criar um MVP de uma aplicação web chamada "Recomenda Aí".

O objetivo é organizar recomendações que atualmente são compartilhadas em um grupo de WhatsApp.

Neste momento NÃO quero autenticação, login, e-mails, notificações ou funcionalidades complexas.

Quero apenas uma aplicação simples, bem organizada e fácil de evoluir.

## Tecnologias

Frontend

- React

- TypeScript

- Vite

- React Router

- Tailwind CSS

- shadcn/ui

Backend

- FastAPI

- SQLAlchemy 2

- Alembic

Banco

- PostgreSQL

Arquivos

- MinIO

Tudo deve funcionar utilizando Docker Compose.

Crie um docker-compose contendo:

- frontend

- backend

- postgres

- minio

------------------------------------------------

OBJETIVO

A aplicação deve permitir cadastrar e consultar recomendações.

------------------------------------------------

CATEGORIAS

Criar inicialmente:

- Filmes

- Séries

- Jogos

- Livros

- Restaurantes

- Comidas

- Música

- Lugares

- Outros

------------------------------------------------

RECOMENDAÇÃO

Cada recomendação possui:

Título

Categoria

Descrição

Quem recomendou

Imagem de capa (opcional)

Tags

Links externos

Data de criação

------------------------------------------------

LINKS

Uma recomendação pode possuir vários links.

Exemplos:

IMDb

Steam

Spotify

Google Maps

YouTube

Site oficial

------------------------------------------------

TELAS

Home

Nova recomendação

Editar recomendação

Detalhes da recomendação

Lista de categorias

------------------------------------------------

HOME

Na Home mostrar:

Campo de pesquisa

Lista das categorias

Últimas recomendações

------------------------------------------------

BUSCA

Pesquisar por:

Título

Categoria

Tags

Quem recomendou

------------------------------------------------

DETALHES

Mostrar:

Imagem

Título

Categoria

Descrição

Quem recomendou

Data

Links

Tags

------------------------------------------------

CRUD

Permitir:

Criar

Editar

Excluir

Listar

------------------------------------------------

BANCO

Modelar as tabelas:

categories

recommendations

links

tags

recommendation_tags

Criar migrations utilizando Alembic.

Criar dados iniciais contendo:

As categorias

10 recomendações de exemplo

------------------------------------------------

BACKEND

Organizar em:

app/

api/

models/

schemas/

repositories/

services/

database/

core/

Criar documentação Swagger.

------------------------------------------------

FRONTEND

Organizar em:

pages/

components/

hooks/

services/

types/

Criar uma interface moderna utilizando Tailwind e shadcn/ui.

Utilizar cards para representar cada recomendação.

------------------------------------------------

DESIGN

Tema escuro.

Visual moderno.

Interface inspirada no Letterboxd.

Responsiva.

------------------------------------------------

IMPORTANTE

Escreva o código pensando na futura implementação de:

- autenticação

- avaliações

- comentários

- favoritos

- sistema de recomendação

Mas NÃO implemente essas funcionalidades agora.

Quero um MVP pequeno, organizado, limpo e fácil de evoluir.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dbe32634-cfff-47c7-81bb-5d920c0665a9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
