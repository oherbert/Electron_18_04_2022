/* eslint-disable @typescript-eslint/lines-between-class-members */
import { ipcMain } from 'electron';
import querys from '../model/querys';
import execSql, { ping } from '../helpers/executaSQL';
import getDBConfig, {
  saveDBConfig,
  IDbConfig,
  changeDBConfig,
  IDBParameter,
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

ipcMain.on('server', async (event, comand: string, port = 4000) => {
  const resp = 'server on';

  if (!server && comand === 'start')
    server = appServer.server.listen(port, () => {
      console.log('App start');
    });
  else if (server && comand === 'stop') {
    server.close();
    console.log('App Stop');
  }
  event.reply('server', resp);
});

// Channel that change job state
ipcMain.on('job', (_event, comand: 'Start' | 'Stop', port = 4000) => {
  if (!server && comand === 'Start')
    server = appServer.server.listen(port, () => {
      tray.setRadioBtnTrue(comand);
      console.log(`App start port: ${port}`);
    });
  else if (server && comand === 'Start')
    server.listen(port, () => {
      tray.setRadioBtnTrue(comand);
      console.log(`App start port: ${port}`);
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
  async (event, param: IDBParameter, value: string) => {
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
