# Recomenda Aí

MVP para organizar as recomendações que hoje se perdem no grupo do WhatsApp.

## Stack

| Camada  | Tecnologias |
| ------- | ----------- |
| Frontend | React 18, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS, shadcn/ui |
| Backend  | FastAPI, SQLAlchemy 2, Alembic, Pydantic v2 |
| Banco    | PostgreSQL 16 |
| Arquivos | MinIO (S3 compatível) |

## Como rodar

```bash
docker compose up --build
```

| Serviço | URL |
| ------- | --- |
| Frontend | http://localhost:5173 |
| API | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |
| MinIO Console | http://localhost:9001 (minioadmin / minioadmin) |

As migrations do Alembic rodam automaticamente na subida do backend, criando o schema e o seed
(9 categorias + 10 recomendações de exemplo).

## Migrations

```bash
docker compose exec backend alembic upgrade head
docker compose exec backend alembic downgrade -1
docker compose exec backend alembic revision --autogenerate -m "mensagem"
```

## Estrutura

```text
backend/
  alembic/            migrations (0001 schema, 0002 seed)
  app/
    api/              rotas HTTP (v1) e dependências
    core/             config e utilidades
    database/         engine, sessão e Base declarativa
    models/           entidades SQLAlchemy
    repositories/     acesso a dados
    schemas/          contratos Pydantic
    services/         regras de negócio + storage MinIO
frontend/
  src/
    components/       UI compartilhada (+ ui/ do shadcn)
    hooks/            hooks de dados (TanStack Query)
    pages/            telas
    services/         cliente HTTP
    types/            contratos TypeScript
```

## Modelo de dados

- `categories` — nome, slug, ícone
- `recommendations` — título, descrição, quem recomendou, capa, categoria, datas
- `links` — N links por recomendação (IMDb, Steam, Spotify, Maps, YouTube...)
- `tags` + `recommendation_tags` — relacionamento N:N

## Telas

Home (busca + categorias + últimas), Lista de categorias, Categoria, Detalhes, Nova e Editar.

## Busca

`GET /api/v1/recommendations?search=termo&category=filmes` pesquisa por título, categoria,
tags e quem recomendou.

## Preparado para evoluir (não implementado)

O código isola regras em `services/` e acesso a dados em `repositories/`, então os próximos
módulos entram sem reescrita:

- **Autenticação** — `app/api/deps.py` já reserva o ponto do `CurrentUser`; basta adicionar
  `user_id` em `recommendations` e proteger as rotas de escrita.
- **Avaliações / comentários / favoritos** — novas tabelas com FK para `recommendations`,
  novos repositórios e serviços, sem tocar no que existe.
- **Sistema de recomendação** — as tags e categorias já normalizadas servem de base para
  similaridade.
