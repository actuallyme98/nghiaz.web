import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { APIRequest } from '../interfaces';

import { ConfigService } from '@nestjs/config';

import { AddressService } from '@api/services';

@ApiBearerAuth()
@ApiTags('delivery address')
@Controller('delivery-address')
export class AddressController {
  constructor(
    private configService: ConfigService,
    private readonly addressService: AddressService,
  ) {}
  @ApiResponse({
    status: 200,
  })
  @Get('/list')
  async listDeliveryAddresses(@Param('id') id: number, @Res() res: Response) {
    const data = await this.addressService.findAll(id);
    res.json({ data });
  }
}
