/* eslint-disable @typescript-eslint/no-explicit-any */
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
      try {
        oracledb.initOracleClient({ libDir: libPath });
      } catch (error: any) {
        console.log(error.message);
      }
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
  statement: string,
  binds: BindParameters = [],
  options: ExecuteOptions = {}
) {
  reloadDBConfig();
  console.log(oracledb.oracleClientVersion);

  let pool;

  try {
    pool = await oracledb.createPool(dbConfig);

    let connection;
    try {
      connection = await pool.getConnection();
      const result = await connection.execute(statement, binds, options);

      return result.rows;
    } catch (err: any) {
      return [err.message];
    } finally {
      if (connection) {
        try {
          await connection.close(); // Put the connection back in the pool
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err: any) {
    console.error(err.message);
    return [err.message];
  } finally {
    if (pool) await pool.close();
  }
}

export async function ping() {
  reloadDBConfig();

  let pool;

  try {
    pool = await oracledb.createPool(dbConfig);

    let connection;
    try {
      connection = await pool.getConnection();

      connection.ping();

      return 'online';
    } catch (err: any) {
      return err.message;
    } finally {
      if (connection) {
        try {
          await connection.close(); // Put the connection back in the pool
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err: any) {
    console.error(err.message);
    return [err.message];
  } finally {
    if (pool) await pool.close();
  }
}
