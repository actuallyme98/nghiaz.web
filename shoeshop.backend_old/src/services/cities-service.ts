import { Mssql } from '../base';

import { toGCity, toGDistrict, toGWard } from '../transforms';

export class CitesService {
  public async listCities() {
    const result = await Mssql.FindAll('city');
    if (!result) {
      return;
    }
    return result.map((x: any) => toGCity(x));
  }

  public async findCityByCode(code: number) {
    const result = await Mssql.Find('city', 'code', code);
    if (!result) {
      return;
    }
    return toGCity(result);
  }

  public async findDistrictByCode(code: number) {
    const result = await Mssql.Find('district', 'code', code);
    if (!result) {
      return;
    }
    return toGDistrict(result);
  }

  public async findDistrictByCityCode(code: number) {
    const result = await Mssql.FindAllBy('district', 'city_id', code);
    if (!result) {
      return;
    }
    return result.map((x: any) => toGDistrict(x));
  }

  public async findWardByCode(code: number) {
    const result = await Mssql.Find('ward', 'code', code);
    if (!result) {
      return;
    }
    return toGWard(result);
  }

  public async findWardByDistrictCode(code: number) {
    const result = await Mssql.FindAllBy('ward', 'district_id', code);
    if (!result) {
      return;
    }
    return result.map((x: any) => toGWard(x));
  }
}

export default new CitesService();
