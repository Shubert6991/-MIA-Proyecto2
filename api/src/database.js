const oracledb = require('oracledb');
const { database } = require('./keys');

async function Open(sql, binds, autoCommit) {
  let conn = await oracledb.getConnection(database);
  let result = await conn.execute(sql, binds, { autoCommit });
  conn.release();
  return result;
}

exports.Open = Open;