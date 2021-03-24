import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { APIRequest } from '../interfaces';

import { ConfigService } from '@nestjs/config';

import { AddressService } from '@api/services';
import { CreateAddressDTO, UpdateAddressDTO } from '../dtos';

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
  async listDeliveryAddresses(@Req() req: APIRequest, @Res() res: Response) {
    const { client } = req.user;
    const data = await this.addressService.findAll(client.id);
    return res.json({ data });
  }

  @Post('/')
  async createDeliveryAddress(@Body() payload: CreateAddressDTO) {
    return await this.addressService.createAddress(payload);
  }

  @Delete('/delete/:id')
  async deleteDeliveryAddress(@Param('id') id: number) {
    return await this.addressService.deleteAddress(id);
  }

  @Put('/update')
  async updateDeliveryAddress(@Body() payload: UpdateAddressDTO) {
    return this.addressService.updateAddress(payload);
  }

  @Put('/set-default/:id')
  async setDefaultDeliveryAddress(@Param('id') id: number) {
    return this.addressService.setDefaultAddress(id);
  }
}
