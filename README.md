# TODOLIST

App de tarefas com backend Fastify + MySQL e frontend React + Vite.

## Backend

Pasta: `backend/`

- Porta: `3333`
- CORS: origens `localhost` / `127.0.0.1` (qualquer porta do Vite) e, se definido, `CORS_ORIGIN`
- Rotas: `GET/POST /api/tasks`, `PATCH/DELETE /api/tasks/:id`, `GET /health`

```bash
cd backend
npm install
npm run dev
```

Configure o MySQL com `schema.sql` e um `.env` com `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `PORT=3333`.

## Frontend

Pasta: `frontend/`

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` (se a porta estiver ocupada, o Vite usa 5174). Em desenvolvimento as chamadas `/api` passam pelo proxy do Vite. Detalhes em `frontend/README.md`.
