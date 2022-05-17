import { Router } from 'express';
import execSql from '../../../helpers/executaSQL';
import getApiConfig from '../../../config/api';

export default function getRoutes() {
  const routes: Router = Router();

  const api = getApiConfig();

  [api.routes].forEach((route) => {
    if (route.method === 'GET') {
      console.log('reload routes');
      routes.get(route.url, async (_req, res) => {
        try {
          // console.log(route.sql);
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

  return routes;
}
