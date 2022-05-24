/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import oracledb, { BindParameters, ExecuteOptions } from 'oracledb';
import getDBConfig from '../config/database';
import MainEnv from '../main/MainEnv';

oracledb.fetchAsString = [oracledb.DATE, oracledb.CLOB, oracledb.NCLOB];
oracledb.fetchAsBuffer = [oracledb.BLOB];
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

const blobsToBase64 = (
  rows: any[] | undefined,
  metaData: oracledb.Metadata<any>[] | undefined
) => {
  if (metaData && rows && metaData.length > 0) {
    const blobsFields = metaData
      .map((data) => (data.dbTypeName === 'BLOB' ? data.name : false))
      .filter((f) => f);

    if (blobsFields) {
      rows.forEach((row: any) => {
        Object.keys(row).forEach((key) => {
          if (blobsFields.includes(key)) {
            row[key] = row[key].toString('base64');
          }
        });
      });
    }
  }
  return rows;
};

export default async function execSql(
  statement: string,
  binds: BindParameters = [],
  options: ExecuteOptions = { extendedMetaData: true }
) {
  reloadDBConfig();
  // console.log(oracledb.oracleClientVersion);

  let pool;

  try {
    pool = await oracledb.createPool(dbConfig);

    let connection;
    let opt = null;

    try {
      connection = await pool.getConnection();

      const stm = statement.toLowerCase();

      if (stm.indexOf('begin') > -1 && stm.indexOf('end') > -1) {
        if (stm.indexOf(':cursor') > -1) {
          opt = {
            cursor: {
              type: oracledb.CURSOR,
              dir: oracledb.BIND_OUT,
            },
          };
        } else if (stm.indexOf(':retorno') > -1) {
          opt = {
            retorno: {
              type: oracledb.CURSOR,
              dir: oracledb.BIND_OUT,
            },
          };
        }
      }

      const result = opt
        ? await connection.execute<any>(statement, opt, options)
        : await connection.execute<any>(statement, binds, options);

      const resultSet = result.outBinds
        ? result.outBinds.cursor ?? result.outBinds.retorno
        : null;

      // Tratamento de cursores
      if (resultSet) {
        let rows: any[] | undefined = await resultSet.getRows();
        rows = blobsToBase64(rows, resultSet.metaData);

        await resultSet.close();

        return rows;
      }

      return blobsToBase64(result.rows, result.metaData);
    } catch (err: any) {
      console.log(err);

      return [err.message];
    } finally {
      if (connection) {
        try {
          await connection.close();
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
