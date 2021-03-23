import { Express } from 'express';
import glob from 'glob';
import path from 'path';
import { mssqlCreator } from './db/connection';

module.exports = async (app: Express) => {
  try {
    // connect mssql
    await mssqlCreator();

    // Load modules
    let strategiesPath = path.normalize(__dirname + '/mssql/seed-data');
    let datas = glob.sync(`${strategiesPath}/*.?(js|ts)`);

    // seed data
    for (let data of datas) {
      try {
        await require(data)(app);
        console.log('Seed data loaded : ' + data);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    throw new Error('Failed to connect MSSQL : ' + error);
  }
};
