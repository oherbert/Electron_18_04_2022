import IDbConfig from 'renderer/types/IDbConfig';

const { on } = window.electron.ipcRenderer;

export default async function getConfig(): Promise<IDbConfig> {
  window.electron.ipcRenderer.getDBConfig();

  const res = await new Promise<IDbConfig>((resolve) =>
    on('getConfig', resolve)
  );

  return res;
}
