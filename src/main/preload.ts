import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    execSql(channel: string, params: string[]) {
      ipcRenderer.send(channel, params);
    },
    saveDBConfig(param: string, value: string) {
      ipcRenderer.send('saveDBConfig', param, value);
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
