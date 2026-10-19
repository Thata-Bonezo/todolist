# Todo App. — frontend

Interface React + Vite do TODOLIST. Consome o backend Fastify em `../backend`.

## Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:3333`
- MySQL com o schema aplicado (`schema.sql` na raiz ou em `backend/schema.sql`)

## Como rodar

No backend (`backend/`):

```bash
npm install
```

Crie um `.env` no backend (se ainda não existir):

```
PORT=3333
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=todolist
```

`CORS_ORIGIN` é opcional. O servidor já aceita qualquer origem em `localhost`.

```bash
npm run dev
```

No frontend (`frontend/`):

```bash
npm install
```

Copie `.env.example` para `.env`. `VITE_API_URL` é usado no **build de produção**. No `npm run dev`, o app chama `/api` e o Vite encaminha para `http://localhost:3333`.

```bash
npm run dev
```

Abra `http://localhost:5173` (ou a porta que o Vite indicar).

## Scripts

- `npm run dev` — servidor de desenvolvimento (com proxy `/api`)
- `npm run build` — build de produção
- `npm run preview` — preview do build
