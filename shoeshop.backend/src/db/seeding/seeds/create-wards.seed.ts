import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { Ward } from '@api/entities';

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

const replaceWardPrefix = (name: string) => {
  return name
    .replace(/Phường /g, '')
    .replace(/Xã /g, '')
    .replace(/Thị trấn /g, '');
};

export default class CreateWard implements Seeder {
  public async run({}, connection: Connection): Promise<any> {
    const qb = connection.getRepository(Ward).createQueryBuilder();
    if (await qb.getOne()) {
      return;
    }
    for (let i = 0; i < paths.length; i++) {
      const workbook = XLSX.readFile(paths[i]);
      const sheetNameList = workbook.SheetNames;
      const xlData: IXlsData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

      const groupedDistrict = Object.values(lodash.groupBy(xlData, 'Mã QH'));
      for (let y = 0; y < groupedDistrict.length; y++) {
        for (const [index, path] of groupedDistrict[y].entries()) {
          const newWard = new Ward({
            districtId: parseInt(path['Mã QH']),
            code: parseInt(path['Mã PX']),
            name: replaceWardPrefix(path['Phường Xã']),
            isActive: 1,
          });
          await newWard.save();
        }
      }
    }
  }
}
