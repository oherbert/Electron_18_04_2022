import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import getApiConfig from '../../config/api';
// import execSql from '../../helpers/executaSQL';
import getRoutes from './routes';

export default class AppServer {
  private static instance?: AppServer;

  private express;

  private server?: null | Server;

  private constructor() {
    this.express = express();
    this.middlewares();
    this.server = null;
  }

  public static getInstance(): AppServer {
    if (!AppServer.instance) {
      AppServer.instance = new AppServer();
    }
    return AppServer.instance;
  }

  public static getNewInstance(): AppServer {
    if (AppServer.instance) {
      if (AppServer.instance.server) {
        AppServer.instance.server.close();
        AppServer.instance.server.removeAllListeners();
        delete AppServer.instance.server;
      }
      AppServer.instance.express.removeAllListeners();
      delete AppServer.instance;
      AppServer.instance = new AppServer();
    } else {
      AppServer.instance = new AppServer();
    }

    return AppServer.instance;
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(getRoutes());
    // this.getRoutes();
  }

  public start(callback?: () => void) {
    const api = getApiConfig();
    const port = api.port || 19020;

    if (!this.server)
      this.server = this.express.listen(port, () => {
        if (callback) callback();
        console.log(`App start port: ${port}`);
      });
    else
      this.server.listen(port, () => {
        if (callback) callback();
        console.log(`App start port: ${port}`);
      });
  }

  public stop() {
    if (this.server) this.server.close();
  }

  // public getRoutes() {
  //   const routes: Router = Router();

  //   const api = getApiConfig();

  //   [api.routes].forEach((route) => {
  //     if (route.method === 'GET') {
  //       console.log('reload routes');
  //       routes.get(route.url, async (_req, res) => {
  //         try {
  //           // console.log(route.sql);
  //           const response = await execSql(route.sql);

  //           return res.status(200).json({ resposta: response });
  //         } catch (error) {
  //           return res.status(404).json({ error });
  //         }
  //       });
  //     }
  //     if (route.method === 'POST') {
  //       routes.post(route.url, async (_req, res) => {
  //         const response = await execSql(route.sql);

  //         return res.status(200).json({ resposta: response });
  //       });
  //     }
  //   });

  //   // rotas default
  //   routes.get('/dev/teste', (_req, res) => {
  //     return res.status(200).json({ resposta: 'Online' });
  //   });

  //   routes.all('*', (_req, res) => {
  //     return res.status(200).json({ resposta: 'Route not found' });
  //   });

  //   this.express.routes = null;
  //   this.express.use(routes);
  // }
}
