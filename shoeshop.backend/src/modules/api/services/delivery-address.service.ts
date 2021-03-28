import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ErrorHelper } from '@base/helpers';

import { DeliveryAddressDTO, CreateAddressDTO, UpdateAddressDTO } from '@api/dtos';

import { DeliveryAddress, City, Ward, District, Client } from '@api/entities';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(DeliveryAddress)
    private readonly addressRepository: Repository<DeliveryAddress>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async findAll(id: number): Promise<DeliveryAddressDTO[]> {
    return await this.addressRepository
      .createQueryBuilder('address')
      .where('clientId = :id', { id })
      .leftJoinAndSelect('address.client', 'client')
      .leftJoinAndSelect('address.city', 'city')
      .leftJoinAndSelect('address.district', 'district')
      .leftJoinAndSelect('address.ward', 'ward')
      .getMany();
  }

  async createAddress(args: CreateAddressDTO) {
    const { clientId, cityId, districtId, wardId, phone, address, fullName, isDefault } = args;
    const client = await this.clientRepository.findOne(clientId);
    if (!client) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const city = await this.cityRepository.findOne({ code: cityId });
    if (!city) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const district = await this.districtRepository.findOne({ code: districtId });
    if (!district) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const ward = await this.wardRepository.findOne({ code: wardId });
    if (!ward) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    if (isDefault) {
      await this.removeOtherDefault();
    }
    const newAddress = new DeliveryAddress({
      fullName,
      phone,
      address,
      isDefault,
      city,
      district,
      ward,
      client,
    });
    return await newAddress.save();
  }

  async deleteAddress(id: number) {
    this.addressRepository.delete(id);
  }

  async updateAddress(args: UpdateAddressDTO) {
    const { id, cityId, districtId, wardId, isDefault, fullName, phone, address } = args;
    const data = await this.addressRepository.findOne(id);
    if (!data) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const city = await this.cityRepository.findOne({ code: cityId });
    if (!city) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const district = await this.districtRepository.findOne({ code: districtId });
    if (!district) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    const ward = await this.wardRepository.findOne({ code: wardId });
    if (!ward) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    if (isDefault) {
      await this.removeOtherDefault();
    }
    Object.assign(data, {
      fullName,
      phone,
      address,
      city,
      district,
      ward,
      isDefault,
    });
    return await data.save();
  }

  async removeOtherDefault() {
    await this.addressRepository
      .createQueryBuilder()
      .update()
      .set({ isDefault: 0 })
      .where('isDefault = 1')
      .execute();
  }

  async setDefaultAddress(id: number) {
    await this.removeOtherDefault();
    const address = await this.addressRepository.findOne(id);
    Object.assign(address, {
      isDefault: 1,
    });
    return await address.save();
  }
}
