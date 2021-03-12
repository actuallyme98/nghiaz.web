import { StringHelper } from '../helpers';
import { CityService } from '../services';

export interface GCity {
  id: number;
  code: number;
  name: number;
  isActive: boolean;
}

export interface GDistrict {
  id: number;
  cityId: number;
  code: number;
  name: number;
  isActive: boolean;
}

export interface GWard {
  id: number;
  districtID: number;
  code: number;
  name: number;
  isActive: boolean;
}

export const toGCity = (args: any): GCity => {
  const data = {
    id: args.id,
    code: args.code,
    name: args.name,
    isActive: args.is_active === 1,
  };
  return StringHelper.deepTrim(data);
};

export const toGDistrict = (args: any): GDistrict => {
  const data = {
    id: args.id,
    cityId: args.city_id,
    code: args.code,
    name: args.name,
    isActive: args.is_active,
  };
  return StringHelper.deepTrim(data);
};

export const toGWard = (args: any): GWard => {
  const data = {
    id: args.id,
    districtId: args.district_id,
    code: args.code,
    name: args.name,
    isActive: args.is_active,
  };
  return StringHelper.deepTrim(data);
};
