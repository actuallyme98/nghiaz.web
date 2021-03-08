import { ConnectionPool, config as MSSQLConfig } from 'mssql';
import XLSX from 'xlsx';
import glob from 'glob';

import { CitesService } from '../../../services';

import groupBy from 'lodash/groupBy';

interface IXlsData {
  'Tỉnh Thành Phố': string;
  'Mã TP': string;
  'Quận Huyện': string;
  'Mã QH': string;
  'Phường Xã': string;
  'Mã PX': string;
  Cấp: string;
}

// connection config
const config: MSSQLConfig = {
  user: 'sa', //default user
  password: '0969600910',
  server: 'localhost', // default mssql server
  database: 'bluewind',
  options: {
    enableArithAbort: true,
  },
};

const pool = new ConnectionPool(config);

export const connection = pool;

let paths = glob.sync(__dirname + '/../_old/*.xls');

const replaceCityPrefix = (name: string) => {
  return name.replace(/Tỉnh /g, '').replace(/Thành phố /g, '');
};

const replaceDistPrefix = (name: string) => {
  return name
    .replace(/Huyện /g, '')
    .replace(/Thành phố /g, '')
    .replace(/Thị xã /g, '');
};

const replaceWardPrefix = (name: string) => {
  return name
    .replace(/Phường /g, '')
    .replace(/Xã /g, '')
    .replace(/Thị trấn /g, '');
};

export const seedDataCityCreator = async () => {
  await pool.connect();

  const rows = await CitesService.getCities();
  if (rows > 0) {
    console.log('not execute if exists data');
    pool.close();
    return;
  }

  for (let i = 0; i < paths.length; i++) {
    const workbook = XLSX.readFile(paths[i]);
    const sheetNameList = workbook.SheetNames;
    const xlData: IXlsData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

    try {
      await CitesService.creatCity({
        code: parseInt(xlData[0]['Mã TP']),
        name: replaceCityPrefix(xlData[0]['Tỉnh Thành Phố']),
        isActive: 1,
      });
      console.log('Created success from: ', paths[i].split('_old')[1]);
    } catch (err) {
      throw new Error(err);
    }
  }
};

export const seedDataDistrictCreator = async () => {
  await pool.connect();

  const rows = await CitesService.getDistricts();
  if (rows > 0) {
    console.log('not execute if exists data');
    pool.close();
    return;
  }

  for (let i = 0; i < paths.length; i++) {
    const workbook = XLSX.readFile(paths[i]);
    const sheetNameList = workbook.SheetNames;
    const xlData: IXlsData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

    const groupedDistrict = Object.values(groupBy(xlData, 'Mã QH'));

    for (const [index, path] of groupedDistrict.entries()) {
      try {
        await CitesService.creatDistrict({
          cityId: parseInt(path[0]['Mã TP']),
          code: parseInt(path[0]['Mã QH']),
          name: replaceDistPrefix(path[0]['Quận Huyện']),
          isActive: 1,
        });
        console.log('Created success from: ', paths[i].split('_old')[1], 'district ', index);
      } catch (err) {
        continue;
      }
    }
  }
};

export const seedDataWardCreator = async () => {
  await pool.connect();

  const rows = await CitesService.getWards();
  if (rows > 0) {
    console.log('not execute if exists data');
    pool.close();
    return;
  }

  for (let i = 0; i < paths.length; i++) {
    const workbook = XLSX.readFile(paths[i]);
    const sheetNameList = workbook.SheetNames;
    const xlData: IXlsData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

    const groupedDistrict = Object.values(groupBy(xlData, 'Mã QH'));

    for (let y = 0; y < groupedDistrict.length; y++) {
      for (const [index, path] of groupedDistrict[y].entries()) {
        try {
          await CitesService.creatWard({
            districtId: parseInt(path['Mã QH']),
            code: parseInt(path['Mã PX']),
            name: replaceWardPrefix(path['Phường Xã']),
            isActive: 1,
          });
          console.log('Created success from: ', paths[i].split('_old')[1], 'ward ', y, index);
        } catch (err) {
          continue;
        }
      }
    }
  }
};
