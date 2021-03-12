import { Mssql } from '../base';

import { DeliveryAddress } from '../models';

import { toGDeliveryAddress } from '../transforms';

import { UpdateDeliveryAddressArgs } from '../dtos';

export class DeliveryAddressService {
  public async findAddressById(id: number) {
    try {
      const result = await Mssql.Find('delivery_address', 'id', id);
      if (!result) {
        return;
      }
      return toGDeliveryAddress(result);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAddressByClientId(id?: number) {
    try {
      const result = await Mssql.FindAllBy('delivery_address', 'client_id', id);
      if (!result) {
        return;
      }
      return Promise.all(result.map(async (x: any) => await toGDeliveryAddress(x)));
    } catch (err) {
      throw new Error(err);
    }
  }

  public async createDeliveryAddress(args: DeliveryAddress) {
    if (args.isDefault) {
      await Mssql.Update('delivery_address', { col: 'is_default', value: 1 }, [
        { col: 'is_default', value: 0 },
      ]);
    }

    try {
      const createArgs = {
        fullName: args.fullName,
        phone: args.phone,
        address: args.address,
        clientId: args.clientId,
        cityId: args.cityId,
        districtId: args.districtId,
        wardId: args.wardId,
        isDefault: args.isDefault ? 1 : 0,
      };
      await Mssql.Insert('delivery_address', createArgs);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteDeliveryAddress(id: number) {
    try {
      await Mssql.Delete('delivery_address', 'id', id);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async setDeliveryAddressDefault(id: number) {
    try {
      await Mssql.Update('delivery_address', { col: 'is_default', value: 1 }, [
        { col: 'is_default', value: 0 },
      ]);
      try {
        await Mssql.Update('delivery_address', { col: 'id', value: id }, [
          { col: 'is_default', value: 1 },
        ]);
      } catch (err) {
        throw new Error(err);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateDeliveryAddress(args: UpdateDeliveryAddressArgs) {
    const address = await this.findAddressById(args.id);
    if (!address) {
      throw new Error('Address not found');
    }

    if (args.isDefault) {
      await Mssql.Update('delivery_address', { col: 'is_default', value: 1 }, [
        { col: 'is_default', value: 0 },
      ]);
    }

    try {
      const argsUpdated = [
        { col: 'full_name', value: args.name },
        { col: 'phone', value: args.phone },
        { col: 'address', value: args.address },
        { col: 'city_id', value: args.city },
        { col: 'district_id', value: args.district },
        { col: 'ward_id', value: args.ward },
        { col: 'is_default', value: args.isDefault ? 1 : 0 },
      ];
      await Mssql.Update('delivery_address', { col: 'id', value: args.id }, argsUpdated);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new DeliveryAddressService();
