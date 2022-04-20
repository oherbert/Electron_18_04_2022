import { BrowserWindow, Menu, app } from 'electron';
import MainEnv from './MainEnv';

const mainEnv = MainEnv.getInstance();

const getContextMenu = (win: BrowserWindow | null) =>
  Menu.buildFromTemplate([
    {
      label: 'Start',
      type: 'radio',
      click: () => win?.webContents.send('job', 'Start'),
    },
    {
      label: 'Stop',
      type: 'radio',
      click: () => win?.webContents.send('job', 'Stop'),
    },
    {
      label: 'Close',
      type: 'radio',
      click: () => {
        mainEnv.isQuitting = true;
        app.quit();
      },
    },
  ]);

export default getContextMenu;
