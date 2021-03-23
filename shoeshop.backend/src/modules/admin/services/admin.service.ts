import { Injectable } from '@nestjs/common';
import { User } from '@api/entities';
import { EncryptHelper } from '@base/helpers';
import { classToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStatusType } from '@api/entities/user.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { formatDate } from '../utils';

export interface UserResponse {
  id: string;
  email: string;
  status: UserStatusType;
  createdAt: Date;
  updatedAt: Date;
}
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({});
    if (!user) {
      return null;
    }
    if (!(await EncryptHelper.compare(password, user.password))) {
      return null;
    }
    return classToPlain(user);
  }
}
