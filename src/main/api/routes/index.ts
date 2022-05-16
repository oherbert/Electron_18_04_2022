import { Router } from 'express';
import execSql from '../../../helpers/executaSQL';
import getApiConfig from '../../../config/api';

const routes = Router();

const api = getApiConfig();

[api.routes].forEach((route) => {
  console.log(route.url);

  if (route.method === 'GET') {
    routes.get(route.url, async (_req, res) => {
      try {
        const response = await execSql(route.sql);

        return res.status(200).json({ resposta: response });
      } catch (error) {
        return res.status(404).json({ error });
      }
    });
  }
  if (route.method === 'POST') {
    routes.post(route.url, async (_req, res) => {
      const response = await execSql(route.sql);

      return res.status(200).json({ resposta: response });
    });
  }
});

// rotas default
routes.get('/dev/teste', (_req, res) => {
  return res.status(200).json({ resposta: 'Online' });
});

routes.all('*', (_req, res) => {
  return res.status(200).json({ resposta: 'Route not found' });
});

export default routes;
