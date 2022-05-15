import express from 'express';
import cors from 'cors';
import routes from './routes';

export default class AppServer {
  private static instance: AppServer;

  public server = express();

  private constructor() {
    this.middlewares();
    this.routes();
  }

  public static getInstance(): AppServer {
    if (!AppServer.instance) {
      AppServer.instance = new AppServer();
    }
    return AppServer.instance;
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}
