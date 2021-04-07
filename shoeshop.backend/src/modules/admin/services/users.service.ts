import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Client, User, Cart } from '@api/entities';

import { ErrorHelper, EncryptHelper } from '@base/helpers';
import { classToPlain } from 'class-transformer';
import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from '../dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(options: IPaginationOptions, filters: FilterUserDTO) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.client', 'client')
      .andWhere('u.isSupperUser = :supper', { supper: 0 });

    const { name, phone } = filters;
    if (name) {
      queryBuilder.andWhere('u.name like :s', { s: `%${name}%` });
    }
    if (phone) {
      queryBuilder.andWhere('u.username like :s', { s: `%${phone}%` });
    }
    let records = await paginate(queryBuilder, options);
    let items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }
  async deleteUser(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['client'],
    });
    if (!user) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    await this.userRepository.delete(user);
    return await this.clientRepository.delete(user.client);
  }
  async findOneByPhone(phone: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('username = :phone', { phone })
      .leftJoinAndSelect('user.client', 'client')
      .getOne();
  }
  async createUser(payload: CreateUserDTO) {
    const existUser = await this.findOneByPhone(payload.username);
    if (existUser) {
      throw ErrorHelper.BadRequestException('Số điện thoại này đã được đăng kí');
    }

    const client = new Client({});
    await this.clientRepository.save(client);

    const cart = new Cart({
      client,
    });
    await cart.save();

    const user = new User({
      ...payload,
      password: await User.hashPassword(payload.password),
      client,
    });
    return await this.userRepository.save(user);
  }
  async updateUser(payload: UpdateUserDTO) {
    const { dob, email, firstName, gender, id, lastName, password, username } = payload;
    const user = await this.userRepository.findOne(id, {
      relations: ['client'],
    });
    if (!user) {
      throw ErrorHelper.BadRequestException('[User] not found');
    }
    const newPassword = password ? EncryptHelper.hash(password) : user.password;
    Object.assign(user, {
      firstName,
      lastName,
      password: newPassword,
      username,
      email,
    });
    await user.save();
    const client = await this.clientRepository.findOne(user.client.id);
    if (!client) {
      throw ErrorHelper.BadRequestException('[Client] not found');
    }
    Object.assign(client, {
      dob,
      gender,
    });
    await client.save();
  }
}
