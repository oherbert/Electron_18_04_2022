/* eslint-disable @typescript-eslint/lines-between-class-members */
import { ipcMain } from 'electron';
import getApiConfig, { IApiConfig, saveApiConfig } from '../config/api';
import querys from '../model/querys';
import execSql, { ping } from '../helpers/executaSQL';
import getDBConfig, {
  saveDBConfig,
  IDbConfig,
  changeDBConfig,
} from '../config/database';
import MainEnv from './MainEnv';
import AppServer from './api/AppServer';
import Tray from './TrayApp';

const mainEnv = MainEnv.getInstance();
const appServer = AppServer.getInstance();
const tray = Tray.getInstance();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any = null;

// Singleton pattern
export default class IpcMain {
  private static instance: IpcMain;
  public static validChannels = ['theme', 'job', 'resultSql'];
  // constructor() {}

  public static getInstance(): IpcMain {
    if (!IpcMain.instance) {
      IpcMain.instance = new IpcMain();
    }
    return IpcMain.instance;
  }

  public static checkChannel(channel: string): boolean {
    return this.validChannels.includes(channel);
  }
}

ipcMain.on('ping', async (event) => {
  const resp = await ping();
  event.reply('ping', resp);
});

ipcMain.on('server', async (event, comand: string, port = 19020) => {
  const resp = 'server on';
  const api = getApiConfig();

  if (!server && comand === 'start')
    server = appServer.server.listen(api.port || port, () => {
      console.log('App start');
    });
  else if (server && comand === 'stop') {
    server.close();
    console.log('App Stop');
  }
  event.reply('server', resp);
});

// Channel that change job state
ipcMain.on('job', (_event, comand: 'Start' | 'Stop', port = 19020) => {
  const api = getApiConfig();

  if (!server && comand === 'Start')
    server = appServer.server.listen(api.port || port, () => {
      tray.setRadioBtnTrue(comand);
      console.log(`App start port: ${api.port || port}`);
    });
  else if (server && comand === 'Start')
    server.listen(api.port || port, () => {
      tray.setRadioBtnTrue(comand);
      console.log(`App start port: ${api.port || port}`);
    });
  else if (server && comand === 'Stop') {
    server.close();
    console.log('App Stop');
    tray.setRadioBtnTrue(comand);
  }
});

ipcMain.on('randomId', async (event) => {
  const res = await execSql(querys.randomID);
  event.reply('randomId', res);
});

ipcMain.on('getConfig', async (event) => {
  const res = getDBConfig();
  event.reply('getConfig', res);
});

ipcMain.on(
  'changeDBConfig',
  async (event, param: keyof IDbConfig, value: string) => {
    const saveRes = changeDBConfig(param, value);
    mainEnv.reloadDBConfig = saveRes === 'saved';
    event.reply('changeDBConfig', saveRes);
  }
);

ipcMain.on('saveDBConfig', async (event, dbConfig: IDbConfig) => {
  const saveRes = saveDBConfig(dbConfig);
  mainEnv.reloadDBConfig = saveRes === 'saved';
  event.reply('saveDBConfig', saveRes);
});

ipcMain.on('getApiConfig', async (event) => {
  const res = getApiConfig();
  event.reply('getApiConfig', res);
});

ipcMain.on('saveApiConfig', async (event, apiConfig: IApiConfig) => {
  const saveRes = saveApiConfig(apiConfig);
  event.reply('saveApiConfig', saveRes);
});
