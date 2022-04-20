import fs from 'fs';
import MainEnv from '../main/MainEnv';

export type IDbConfig = 'user' | 'password' | 'connectString';

/// /
const main = MainEnv.getInstance();
const file = main.dbConfig;

/// /
const readDBConfig = () => {
  //   console.log(file);

  try {
    return fs.readFileSync(file, 'utf8');
  } catch (e) {
    return JSON.stringify({ error: e });
  }
};

export default function getDBConfig() {
  let config: { user: string; password: string; connectString: string } = {
    user: '',
    password: '',
    connectString: 'xepdb1',
  };

  try {
    config = JSON.parse(readDBConfig());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return config;
}

export function saveDBConfig(param: IDbConfig, value: string) {
  try {
    const config = getDBConfig();
    const oldValue = `"${param}": "${config[param]}"`;
    const newValue = `"${param}": "${value}"`;

    if (oldValue === newValue) return 'Not Change';

    const dataFile = fs.readFileSync(file, 'utf8');

    const result = dataFile.replace(oldValue, newValue);

    // console.log(dataFile);
    // console.log(oldValue);
    // console.log(newValue);
    // console.log(result);

    fs.writeFileSync(file, result, 'utf8');

    return 'Saved';
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
