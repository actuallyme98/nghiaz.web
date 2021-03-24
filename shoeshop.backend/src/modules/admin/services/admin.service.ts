import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@api/entities';

import { ErrorHelper } from '@base/helpers';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByPhone(phone: string) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .where('username = :phone', { phone })
      .leftJoinAndSelect('user.client', 'client')
      .getOne();

    if (!data || !data.isSupperUser) {
      throw ErrorHelper.BadRequestException('Hãy đăng nhập với tài khoản supper user');
    }
    return data;
  }

  async findOneById(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.client', 'client')
      .getOne();
  }
}
