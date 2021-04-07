import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContactService } from '@api/services';
import { Response } from 'express';
import { CreateContactDTO } from '../dtos';

@ApiBearerAuth()
@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/')
  async createContact(@Body() payload: CreateContactDTO, @Res() res: Response) {
    await this.contactService.insertContact(payload);
    return res.json({ ok: true });
  }
}
