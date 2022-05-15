import { BindParameters, ExecuteOptions } from 'oracledb';

const { on } = window.electron.ipcRenderer;

export default async function execSql<Type>(
  channel: string,
  binds?: BindParameters,
  options?: ExecuteOptions
): Promise<Type> {
  window.electron.ipcRenderer.execSql(channel, binds, options);

  const res = await new Promise<Type>((resolve) => on(channel, resolve));

  return res;
}
