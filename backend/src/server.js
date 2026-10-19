import Fastify from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';
import tasksRoutes from './routes/tasks.js';

const app = Fastify({ logger: true });

function isLocalhost(origin) {
  try {
    const { hostname } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

await app.register(cors, {
  origin(origin, callback) {
    if (!origin || isLocalhost(origin)) {
      callback(null, true);
      return;
    }

    const allowed = (process.env.CORS_ORIGIN || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    callback(null, allowed.includes(origin) || allowed.length === 0);
  },
});

app.get('/health', async () => ({ status: 'ok' }));

await app.register(tasksRoutes);

const port = Number(process.env.PORT) || 3333;

try {
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`Servidor rodando em http://localhost:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
