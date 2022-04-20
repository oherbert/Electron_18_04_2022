/* eslint-disable @typescript-eslint/lines-between-class-members */
import { ipcMain } from 'electron';
import querys from '../model/querys';
import execSql from '../helpers/executaSQL';
import { saveDBConfig, IDbConfig } from '../config/database';

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

ipcMain.on('teste', async (event, parms = []) => {
  try {
    const resp = await execSql(querys.teste, parms);
    console.log(resp);

    event.reply('teste', resp);
  } catch (error) {
    event.reply('teste', error);
  }
});

ipcMain.on('saveDBConfig', async (event, param: IDbConfig, value: string) => {
  event.reply('saveDBConfig', saveDBConfig(param, value));
});
