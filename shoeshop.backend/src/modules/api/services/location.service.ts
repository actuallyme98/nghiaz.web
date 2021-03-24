import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { City, Ward, District } from '@api/entities';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
  ) {}

  async listCities(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async listDistricts(cityId: number): Promise<District[]> {
    return this.districtRepository.find({
      where: {
        cityId,
      },
    });
  }

  async listWards(districtId: number): Promise<Ward[]> {
    return this.wardRepository.find({
      where: {
        districtId,
      },
    });
  }
}
