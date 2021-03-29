import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { VoucherService } from '@admin/services';

import { CreateVoucherDTO, UpdateVoucherCodeDTO, UpdateVoucherDTO } from '@admin/dtos';

import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('voucher')
@Controller('voucher')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}

  @Get('/list')
  async listVouchers(@Res() res: Response) {
    const data = await this.voucherService.listVoucher();
    return res.json({ data });
  }

  @Post('/create')
  async createVoucher(@Body() payload: CreateVoucherDTO, @Res() res: Response) {
    await this.voucherService.createVoucher(payload);
    return res.json({ ok: true });
  }

  @Put('/update')
  async updateVoucher(@Body() payload: UpdateVoucherDTO, @Res() res: Response) {
    await this.voucherService.updateVoucher(payload);
    return res.json({ ok: true });
  }

  @Delete('/delete/:id')
  async deleteVoucher(@Param('id') id: number, @Res() res: Response) {
    await this.voucherService.deleteVoucher(id);
    return res.json({ ok: true });
  }

  @Put('/code/update')
  async updateVoucherCode(@Body() payload: UpdateVoucherCodeDTO, @Res() res: Response) {
    await this.voucherService.updateVoucherCode(payload);
    return res.json({ ok: true });
  }

  @Delete('/code/delete/:id')
  async deleteVoucherCode(@Param('id') id: number, @Res() res: Response) {
    await this.voucherService.deleteVoucherCode(id);
    return res.json({ ok: true });
  }
}
