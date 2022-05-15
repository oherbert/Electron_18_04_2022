/* eslint-disable @typescript-eslint/lines-between-class-members */
import { app } from 'electron';
import path from 'path';

// Singleton pattern
export default class MainEnv {
  private static instance: MainEnv;
  public isQuitting: boolean;
  public reloadDBConfig: boolean;
  public dbConfig: string;
  public oraClient: string;
  private RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  constructor() {
    this.isQuitting = false;
    this.dbConfig = this.getAssetPath('/config/database.json');
    this.oraClient = this.getAssetPath('/instantclient');
    this.reloadDBConfig = false;
  }

  public static getInstance(): MainEnv {
    if (!MainEnv.instance) {
      MainEnv.instance = new MainEnv();
    }
    return MainEnv.instance;
  }

  public getAssetPath(...paths: string[]): string {
    return path.join(this.RESOURCES_PATH, ...paths);
  }
}
