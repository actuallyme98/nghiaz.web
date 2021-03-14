import { Express } from 'express';

import { UserService } from '../../../services';

const seedDataList = [
  {
    username: 'root',
    firstName: 'ADMIN',
    lastName: '',
    password: '12345',
    isSupperUser: 1
  }
];

interface ISeedCreator {
  isDataExist(): Promise<boolean>;
  createSeed(): Promise<void>;
  getSeedData(): any[];
}

const seedCreator: ISeedCreator = {
  async isDataExist(): Promise<boolean> {
    const admin = UserService.findOneByPhone('root');
    return !!admin;
  },

  async createSeed(): Promise<void> {
    try {
      for (const seedData of seedDataList) {
        await UserService.createUser(seedData);
      }
    } catch (err) {
      console.log('Can not create admin seed: ', err);
      return;
    }
  },

  getSeedData(): any[] {
    return seedDataList;
  }
};

module.exports = async (app: Express) => {
  if (!app) {
    // for test
    return seedCreator;
  }

  await seedCreator.createSeed();
  return null;
};