import { Injectable } from '@nestjs/common';
import { Contact } from '@api/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async listContacts(options: IPaginationOptions, phone?: string) {
    const queryBuilder = this.contactRepository.createQueryBuilder('c');
    if (phone) {
      queryBuilder.andWhere('c.phone like :s', { s: `%${phone}%` });
    }
    let records = await paginate(queryBuilder, options);
    let items = classToPlain(records.items);
    records = Object.assign(records, {
      items,
    });
    return records;
  }
  async deleteContact(id: number) {
    return await this.contactRepository.delete(id);
  }
}
