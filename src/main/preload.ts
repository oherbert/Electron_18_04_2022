import { IDbConfig } from 'config/database';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    execSql(channel: string, params: string[]) {
      ipcRenderer.send(channel, params);
    },
    saveDBConfig(dbConfig: IDbConfig) {
      ipcRenderer.send('saveDBConfig', dbConfig);
    },
    changeDBConfig(param: string, value: string) {
      ipcRenderer.send('changeDBConfig', param, value);
    },
    getDBConfig() {
      ipcRenderer.send('getConfig');
    },
    setRadioBtnTrue(jobState: 'Start' | 'Stop') {
      ipcRenderer.send('job', jobState);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
