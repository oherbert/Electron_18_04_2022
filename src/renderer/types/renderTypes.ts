import { Dispatch } from 'react';
import { BindParameters, ExecuteOptions } from 'oracledb';
import IDbConfig from './IDbConfig';

export type Job = 'Start' | 'Stop';
export type Theme = 'light' | 'dark';

export interface IAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export interface ITheme {
  background: string;
  backgroundColor: string;
  color: string;
  menu: {
    background: string;
    backgroundColor: string;
  };
}

export interface IGlobalState {
  userTheme: Theme;
  job: Job;
  dispatch: Dispatch<IAction>;
  getDBConfig: () => Promise<IDbConfig>;
  saveDBConfig(IDbConfig: IDbConfig): Promise<string>;
  execSql: <Type>(
    channel: string,
    binds?: BindParameters,
    options?: ExecuteOptions
  ) => Promise<Type>;
}
