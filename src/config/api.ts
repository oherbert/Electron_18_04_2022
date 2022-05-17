import fs from 'fs';
import MainEnv from '../main/MainEnv';

export interface IApiConfig {
  port: number;
  routes: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    sql: string;
  };
}

/// /
const main = MainEnv.getInstance();
const file = main.apiConfig;

/// /
const readApiConfig = () => {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    return JSON.stringify({ error: e });
  }
};

export default function getApiConfig() {
  let config: IApiConfig = {
    port: 5001,
    routes: {
      method: 'GET',
      url: 'teste',
      sql: 'select 1 from dual',
    },
  };

  try {
    config = JSON.parse(readApiConfig());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  // console.log(config);

  return config;
}

export function changeDBConfig(key: keyof IApiConfig, value: IApiConfig) {
  try {
    const config = getApiConfig();
    const oldValue = `"${key}": "${config[key]}"`;
    const newValue = `"${key}": "${value}"`;

    if (oldValue === newValue) return 'Not Change';

    const dataFile = fs.readFileSync(file, 'utf8');

    const result = dataFile.replace(oldValue, newValue);

    fs.writeFileSync(file, result, 'utf8');

    return 'saved';
  } catch (e) {
    return e;
  }
}

export function saveApiConfig(pConfig: IApiConfig): string {
  try {
    const config = getApiConfig();
    const newConfig = { ...config, ...pConfig };

    fs.writeFileSync(file, JSON.stringify(newConfig), 'utf8');

    return 'saved';
  } catch (e) {
    return `Erro: ${e}`;
  }
}
