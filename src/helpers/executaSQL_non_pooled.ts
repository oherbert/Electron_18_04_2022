import fs from 'fs';
import oracledb, { BindParameters, ExecuteOptions } from 'oracledb';
import getDBConfig from '../config/database';
import MainEnv from '../main/MainEnv';

oracledb.fetchAsString = [oracledb.DATE /* , oracledb.NUMBER */];
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mainEnv = MainEnv.getInstance();
let dbConfig = getDBConfig();

// Carrega instantClient do Assets
const setAppInstantClient = () => {
  if (dbConfig.appInstantClient) {
    let libPath;
    if (process.platform === 'win32') {
      libPath = mainEnv.oraClient;
    }
    if (libPath && fs.existsSync(libPath)) {
      oracledb.initOracleClient({ libDir: libPath });
    }
  }
};

// Recarrega os parametros, caso alterado
const reloadDBConfig = () => {
  if (mainEnv.reloadDBConfig) {
    dbConfig = getDBConfig();

    mainEnv.reloadDBConfig = false;
  }
};
//

setAppInstantClient();

export default async function execSql(
  query: string,
  binds: BindParameters = [],
  options: ExecuteOptions = {}
) {
  reloadDBConfig();
  console.log(oracledb.oracleClientVersion);

  const { user, password, connectString } = dbConfig;

  let connection;
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    const result = await connection.execute(
      query,
      binds, // bind value for :id
      options
    );
    return result.rows;
  } catch (err) {
    // console.error(err);
    return [err];
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  }
}

export async function ping() {
  reloadDBConfig();

  const { user, password, connectString } = dbConfig;

  let connection;
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    return 'online';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.message.toString();
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  }
}
