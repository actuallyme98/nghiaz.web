import { Mssql } from '../base';

import { City, District, Ward } from '../models';

export class CitesService {
  public async getCities() {
    try {
      const result = await Mssql.FindAll('city');
      return result.length;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async creatCity(args: City) {
    try {
      await Mssql.Insert('city', args);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async getDistricts() {
    try {
      const result = await Mssql.FindAll('district');
      return result.length;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async creatDistrict(args: District) {
    try {
      await Mssql.Insert('district', args);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async getWards() {
    try {
      const result = await Mssql.FindAll('ward');
      return result.length;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async creatWard(args: Ward) {
    try {
      await Mssql.Insert('ward', args);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new CitesService();
