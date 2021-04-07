import { Injectable } from '@nestjs/common';
import { Contact } from '@api/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDTO } from '../dtos';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async insertContact(args: CreateContactDTO) {
    const contact = new Contact(args);
    return await contact.save();
  }
}
