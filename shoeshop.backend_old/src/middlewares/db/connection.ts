import { ConnectionPool, config as MSSQLConfig } from 'mssql';

const mssqlPassword = process.env.MSSQL_PASSWORD;
const databaseName = process.env.DATABASE_NAME;

if (!mssqlPassword || !databaseName) {
  throw new Error('Failed to connect MSSQL : {mssqlPassword} or {databaseName} are missing!');
}

// connection config
const config: MSSQLConfig = {
  user: 'sa', //default user
  password: mssqlPassword,
  server: 'localhost', // default mssql server
  database: databaseName,
  options: {
    enableArithAbort: true,
  },
};

const pool = new ConnectionPool(config);

export const mssqlCreator = async () => {
  try {
    console.log('Connecting to MSSQL localhost ......');
    await pool.connect();
    console.log(`Successfully connected to MSSQL: sa - (${databaseName})`);
  } catch (error) {
    throw new Error('Failed to connect MSSQL : ' + error);
  }
};

export const connection = pool;
