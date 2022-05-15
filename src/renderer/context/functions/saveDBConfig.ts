import IDbConfig from 'renderer/types/IDbConfig';

const { on } = window.electron.ipcRenderer;

export default async function saveDBConfig(
  dbConfig: IDbConfig
): Promise<string> {
  window.electron.ipcRenderer.saveDBConfig(dbConfig);

  const res = await new Promise<string>((resolve) =>
    on('saveDBConfig', resolve)
  );

  return res;
}
