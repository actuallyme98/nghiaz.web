import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { District } from '@api/entities';

import * as XLSX from 'xlsx';
import * as glob from 'glob';

import * as lodash from 'lodash';

interface IXlsData {
  'Tỉnh Thành Phố': string;
  'Mã TP': string;
  'Quận Huyện': string;
  'Mã QH': string;
  'Phường Xã': string;
  'Mã PX': string;
  Cấp: string;
}

let paths = glob.sync(__dirname + '/_old/*.xls');

const replaceDistPrefix = (name: string) => {
  return name
    .replace(/Huyện /g, '')
    .replace(/Thành phố /g, '')
    .replace(/Thị xã /g, '');
};

export default class CreateDistrict implements Seeder {
  public async run({}, connection: Connection): Promise<any> {
    const qb = connection.getRepository(District).createQueryBuilder();
    if (await qb.getOne()) {
      return;
    }
    for (let i = 0; i < paths.length; i++) {
      const workbook = XLSX.readFile(paths[i]);
      const sheetNameList = workbook.SheetNames;
      const xlData: IXlsData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

      const groupedDistrict = Object.values(lodash.groupBy(xlData, 'Mã QH'));

      for (const [index, path] of groupedDistrict.entries()) {
        const newDist = new District({
          cityId: parseInt(path[0]['Mã TP']),
          code: parseInt(path[0]['Mã QH']),
          name: replaceDistPrefix(path[0]['Quận Huyện']),
          isActive: 1,
        });
        await newDist.save();
      }
    }
  }
}
