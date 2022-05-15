import fs from 'fs';
import MainEnv from '../main/MainEnv';

export type IDBParameter =
  | 'user'
  | 'password'
  | 'connectString'
  | 'appInstantClient';

export interface IDbConfig {
  user: string;
  password: string;
  connectString: string;
  appInstantClient?: boolean;
}

/// /
const main = MainEnv.getInstance();
const file = main.dbConfig;

/// /
const readDBConfig = () => {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    return JSON.stringify({ error: e });
  }
};

export default function getDBConfig() {
  let config: IDbConfig = {
    user: '',
    password: '',
    connectString: 'xepdb1',
    appInstantClient: false,
  };

  try {
    config = JSON.parse(readDBConfig());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return config;
}

export function changeDBConfig(param: IDBParameter, value: string) {
  try {
    const config = getDBConfig();
    const oldValue = `"${param}": "${config[param]}"`;
    const newValue = `"${param}": "${value}"`;

    if (oldValue === newValue) return 'Not Change';

    const dataFile = fs.readFileSync(file, 'utf8');

    const result = dataFile.replace(oldValue, newValue);

    fs.writeFileSync(file, result, 'utf8');

    return 'saved';
  } catch (e) {
    return e;
  }
}

export function saveDBConfig(pConfig: IDbConfig) {
  try {
    const config = getDBConfig();
    const newConfig = { ...config, ...pConfig };

    fs.writeFileSync(file, JSON.stringify(newConfig), 'utf8');

    return 'saved';
  } catch (e) {
    return e;
  }
}

// const user = 'hr';
// const password = 'hr';
// const connectString = 'localhost/xepdb1';

// export default {
//   user: 'hr',
//   password: 'hr',
//   connectString: 'localhost/xepdb1',
// };
