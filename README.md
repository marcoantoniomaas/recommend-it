# Recommend It

Sistema simples para organizar e compartilhar recomendações de filmes, séries, livros, jogos, restaurantes e qualquer outro tipo de conteúdo.

## Tecnologias

### Backend
- Python 3.12
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Infraestrutura
- Docker
- Docker Compose
- PostgreSQL
- MinIO (armazenamento de imagens)

---

## Estrutura do projeto

```text
.
├── backend/      # API FastAPI
├── frontend/     # Interface React
├── docker/       # Arquivos de infraestrutura (opcional)
├── docker-compose.yml
└── README.md
```

---

## Funcionalidades

- Cadastro de recomendações
- Categorias
- Tags
- Upload de imagens
- Busca por recomendações
- Interface web responsiva

---

## Executando o projeto

### Pré-requisitos

- Docker
- Docker Compose

### Subir o ambiente

```bash
docker compose up --build
```

Aplicações disponíveis:

| Serviço | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |
| MinIO | http://localhost:9001 |

---

## Desenvolvimento

Reconstruir as imagens:

```bash
docker compose build --no-cache
docker compose up
```

Parar o ambiente:

```bash
docker compose down
```

---

## Banco de dados

As migrações são gerenciadas com Alembic.

Criar uma nova migration:

```bash
alembic revision --autogenerate -m "Descrição"
```

Aplicar migrations:

```bash
alembic upgrade head
```

---

## Roadmap

- [ ] Autenticação de usuários
- [ ] Favoritos
- [ ] Compartilhamento de listas
- [ ] Busca avançada
- [ ] Avaliações
- [ ] Comentários
- [ ] Dashboard
- [ ] API pública

---

## Licença

Projeto desenvolvido para fins de estudo e uso pessoal.