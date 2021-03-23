import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { User } from '@api/entities';
import { EncryptHelper } from '@base/helpers';
import * as adminData from './data/admins.json';

export default class CreateAdmin implements Seeder {
  public async run({}, connection: Connection): Promise<any> {
    const qb = connection.getRepository(User).createQueryBuilder();
    if (await qb.getOne()) {
      return;
    }
    const arr = await Promise.all(
      adminData.map(async item => ({
        ...item,
        password: await EncryptHelper.hash(item.password),
      })),
    );
    await qb
      .insert()
      .values(arr as any)
      .execute();
  }
}
