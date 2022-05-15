import { Router } from 'express';

const routes = Router();

// rotas default
routes.get('/teste', (_req, res) => {
  return res.status(200).json({ resposta: 'Online' });
});

routes.all('*', (_req, res) => {
  return res.status(200).json({ resposta: 'Route not found' });
});

export default routes;
