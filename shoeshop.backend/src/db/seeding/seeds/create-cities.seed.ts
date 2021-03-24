import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { City } from '@api/entities';

import * as XLSX from 'xlsx';
import * as glob from 'glob';

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

const replaceCityPrefix = (name: string) => {
  return name.replace(/Tỉnh /g, '').replace(/Thành phố /g, '');
};

export default class CreateCity implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const qb = connection.getRepository(City).createQueryBuilder();
    if (await qb.getOne()) {
      return;
    }

    const datas = [];
    for (let i = 0; i < paths.length; i++) {
      const workbook = XLSX.readFile(paths[i]);
      const sheetNameList = workbook.SheetNames;
      const xlData: IXlsData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
      const newCity = new City({
        code: parseInt(xlData[0]['Mã TP']),
        name: replaceCityPrefix(xlData[0]['Tỉnh Thành Phố']),
        isActive: 1,
      });
      datas.push(newCity);
    }
    await qb.insert().values(datas).execute();
  }
}
