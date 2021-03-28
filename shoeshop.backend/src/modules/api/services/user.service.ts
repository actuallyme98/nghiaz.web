import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { classToPlain } from 'class-transformer';

import { EncryptHelper, ErrorHelper } from '@base/helpers';

import { CreateUserDTO, UserDTO, UpdateInfoDTO, UpdatePasswordDTO } from '@api/dtos';

import { User, Client, Cart } from '@api/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(options: IPaginationOptions, s: string): Promise<Pagination<UserDTO>> {
    const queryBuilder = this.userRepository.createQueryBuilder('c');
    s = s.trim();
    if (s.length > 0) {
      queryBuilder.orWhere('username like :s', { s: `%${s}%` });
    }
    let records = await paginate<UserDTO>(queryBuilder, options);
    const items = classToPlain(records.items);
    records = Object.assign(records, { items: items });
    return records;
  }

  async create(payload: CreateUserDTO) {
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

  async findOneByPhone(phone: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('username = :phone', { phone })
      .leftJoinAndSelect('user.client', 'client')
      .getOne();
  }

  async findOneById(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.client', 'client')
      .getOne();
  }

  async updateInfo(id: number, args: UpdateInfoDTO) {
    const { firstName, lastName, phoneNumber, birthday, gender, email } = args;
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    Object.assign(user, {
      firstName,
      lastName,
      email,
      username: phoneNumber,
      updatedAt: new Date(),
    });
    await user.save();

    const client = await this.clientRepository.findOne(args.id);
    if (!client) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    Object.assign(client, {
      dob: birthday,
      gender,
    });
    return await client.save();
  }

  async updateAvatar(id: number, url: string) {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    Object.assign(client, {
      avatar: url,
    });
    return await client.save();
  }

  async updatePassword(id: number, args: UpdatePasswordDTO) {
    const { oldPassword, newPassword } = args;
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw ErrorHelper.BadRequestException('Unauthorized');
    }
    if (!EncryptHelper.compare(oldPassword, user.password)) {
      throw ErrorHelper.BadRequestException('Mật khẩu cũ sai');
    }
    Object.assign(user, {
      password: EncryptHelper.hash(newPassword),
      updatedAt: new Date(),
    });
    return await user.save();
  }
}
