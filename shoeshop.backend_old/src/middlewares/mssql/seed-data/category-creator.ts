import { Express } from 'express';

import { Category } from '../../../models';
import { CategoryService } from '../../../services/admin';

const seedDataList: Category[] = [
  {
    name: 'Giày nam',
    image: '',
    slug: 'giay-nam',
  },
  {
    name: 'Giày nữ',
    image: '',
    slug: 'giay-nu',
  },
  {
    name: 'Túi xách',
    image: '',
    slug: 'tui-xach',
  },
  {
    name: 'Dây giày',
    image: '',
    slug: 'day-giay',
  },
  {
    name: 'Bình xịt',
    image: '',
    slug: 'binh-xit',
  },
  {
    name: 'Tất',
    image: '',
    slug: 'tat',
  },
  {
    name: 'Lót giày',
    image: '',
    slug: 'lot-giay',
  },
];

interface ISeedCreator {
  isDataExist(): Promise<boolean>;
  createSeed(): Promise<void>;
}

const seedCreator: ISeedCreator = {
  async isDataExist(): Promise<boolean> {
    const datas = await CategoryService.listCategories();
    return datas.length > 0;
  },

  async createSeed(): Promise<void> {
    const isExist = await this.isDataExist();
    if (!isExist) {
      try {
        for (const seedData of seedDataList) {
          await CategoryService.createCategory(seedData);
        }
      } catch (err) {
        console.log('Can not create category seed: ', err);
        return;
      }
    }
  },
};

module.exports = async (app: Express) => {
  if (!app) {
    // for test
    return seedCreator;
  }

  await seedCreator.createSeed();
  return null;
};
