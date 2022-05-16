import IApiConfig from 'renderer/types/IApiConfig';

const { on } = window.electron.ipcRenderer;

export default async function saveApiConfig(
  dbConfig: IApiConfig
): Promise<string> {
  window.electron.ipcRenderer.saveApiConfig(dbConfig);

  const res = await new Promise<string>((resolve) =>
    on('saveApiConfig', resolve)
  );

  return res;
}
