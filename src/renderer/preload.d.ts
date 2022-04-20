/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        execSql(channel: string, params?: string[]): void;
        saveDBConfig(param: string, value: string): void;
        getDBConfig(): string;
        on(
          channel: string,
          func: (...args: any[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
