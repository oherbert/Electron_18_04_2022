import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import helmet from 'helmet';
import getApiConfig from '../../config/api';
// import execSql from '../../helpers/executaSQL';
import getRoutes from './routes';
// import acessControl from './acessControl';

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
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(helmet());
    // this.express.use(acessControl);
    this.express.use(getRoutes());
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
}
