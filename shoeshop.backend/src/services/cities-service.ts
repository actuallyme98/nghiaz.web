import { Mssql } from '../base';

import { toGCity, toGDistrict, toGWard } from '../transforms';

export class CitesService {
  public async listCities() {
    try {
      const result = await Mssql.FindAll('city');
      if (!result) {
        return;
      }
      return result.map((x: any) => toGCity(x));
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findCityByCode(code: number) {
    try {
      const result = await Mssql.Find('city', 'code', code);
      if (!result) {
        return;
      }
      return toGCity(result);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findDistrictByCode(code: number) {
    try {
      const result = await Mssql.Find('district', 'code', code);
      if (!result) {
        return;
      }
      return toGDistrict(result);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findDistrictByCityCode(code: number) {
    try {
      const result = await Mssql.FindAllBy('district', 'city_id', code);
      if (!result) {
        return;
      }
      return result.map((x: any) => toGDistrict(x));
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findWardByCode(code: number) {
    try {
      const result = await Mssql.Find('ward', 'code', code);
      if (!result) {
        return;
      }
      return toGWard(result);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findWardByDistrictCode(code: number) {
    try {
      const result = await Mssql.FindAllBy('ward', 'district_id', code);
      if (!result) {
        return;
      }
      return result.map((x: any) => toGWard(x));
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new CitesService();
