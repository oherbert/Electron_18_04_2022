import oracledb from 'oracledb';
import getDBConfig from '../config/database';

oracledb.fetchAsString = [oracledb.DATE /* , oracledb.NUMBER */];
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export default async function execSql(query: string, condicts: string[] = []) {
  const { user, password, connectString } = getDBConfig();
  // console.log(getDBConfig());

  let connection;
  try {
    connection = await oracledb.getConnection({
      user,
      password,
      connectString,
    });

    const result = await connection.execute(
      query,
      condicts // bind value for :id
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
