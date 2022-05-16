import { Dispatch } from 'react';
import { BindParameters, ExecuteOptions } from 'oracledb';
import IDbConfig from './IDbConfig';
import IApiConfig from './IApiConfig';

export type Job = 'Start' | 'Stop';
export type Theme = 'light' | 'dark';

export interface IAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface IGlobalState {
  userTheme: Theme;
  job: Job;
  dispatch: Dispatch<IAction>;
  getDBConfig: () => Promise<IDbConfig>;
  saveDBConfig(dbConfig: IDbConfig): Promise<string>;
  getApiConfig: () => Promise<IApiConfig>;
  saveApiConfig(apiConfig: IApiConfig): Promise<string>;
  execSql: <Type>(
    channel: string,
    binds?: BindParameters,
    options?: ExecuteOptions
  ) => Promise<Type>;
}
