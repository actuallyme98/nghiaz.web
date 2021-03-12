import { ClientService, CityService } from '../services';
import { StringHelper } from '../helpers';
import { GClient, toGClient } from './client.transform';
import { GCity, GDistrict, GWard, toGCity, toGDistrict, toGWard } from './cities.transform';

export interface GDeliveryAddress {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  client: GClient;
  city: GCity;
  district: GDistrict;
  ward: GWard;
  isDefault: boolean;
}

export const toGDeliveryAddress = async (args: any): Promise<GDeliveryAddress> => {
  const client = await ClientService.findOneById(args.client_id);

  const city = await CityService.findCityByCode(args.city_id);
  const district = await CityService.findDistrictByCode(args.district_id);
  const ward = await CityService.findWardByCode(args.ward_id);

  const data = {
    id: args.id,
    fullName: args.full_name,
    phone: args.phone,
    address: args.address,
    client: toGClient(client),
    city,
    district,
    ward,
    isDefault: args.is_default === 1,
  };
  return StringHelper.deepTrim(data);
};
