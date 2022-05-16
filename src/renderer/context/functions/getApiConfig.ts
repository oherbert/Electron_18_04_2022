import IApiConfig from 'renderer/types/IApiConfig';

const { on } = window.electron.ipcRenderer;

export default async function getApiConfig(): Promise<IApiConfig> {
  window.electron.ipcRenderer.getApiConfig();

  const res = await new Promise<IApiConfig>((resolve) =>
    on('getApiConfig', resolve)
  );

  return res;
}
