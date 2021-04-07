import { Controller, Post, Body, Res, Get, Query, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContactService } from '@admin/services';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/list')
  @ApiQuery({ name: 'phone', required: false, type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async listContact(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('phone') phone: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.contactService.listContacts(
      {
        page,
        limit,
      },
      phone,
    );
    return res.json({ data });
  }
  @Delete('/:id')
  async deleteContact(@Param('id') id: number, @Res() res: Response) {
    await this.contactService.deleteContact(id);
    return res.json({ ok: true });
  }
}
