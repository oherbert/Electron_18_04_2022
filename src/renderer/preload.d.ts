/* eslint-disable @typescript-eslint/no-explicit-any */
import { BindParameters, ExecuteOptions } from 'oracledb';
import IApiConfig from './types/IApiConfig';
import IDbConfig from './types/IDbConfig';
import { Job } from './types/renderTypes';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        execSql(
          channel: string,
          binds?: BindParameters,
          options?: ExecuteOptions
        ): void;
        saveDBConfig(dbConfig: IDbConfig): void;
        getDBConfig(): IDbConfig;
        saveApiConfig(apiConfig: IApiConfig): void;
        getApiConfig(): IApiConfig;
        startFrontend(): void;
        setRadioBtnTrue(jobState: Job): void;
        on(channel: string, func: (...args: any[]) => void): void;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
