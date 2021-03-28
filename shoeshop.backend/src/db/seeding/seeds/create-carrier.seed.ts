import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { Carrier } from '@api/entities';
import * as carrierData from './data/carrier.json';

export default class CreateAdmin implements Seeder {
  public async run({}, connection: Connection): Promise<any> {
    const qb = connection.getRepository(Carrier).createQueryBuilder();
    if (await qb.getOne()) {
      return;
    }
    const arr = carrierData.map((item) => new Carrier(item));
    await qb.insert().values(arr).execute();
  }
}
