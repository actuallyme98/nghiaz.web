import { Controller, Post, Body, Res, Delete, Param, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddCartLineDTO, UpdateCartLineDTO, ApplyVoucherDTO } from '@api/dtos';
import { CartService } from '@api/services';
import { Response } from 'express';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  async getCartLine(@Param('id') id: number, @Res() res: Response) {
    const data = await this.cartService.getCart(id);
    return res.json({ data });
  }

  @Post('/')
  async addCartLine(@Body() payload: AddCartLineDTO, @Res() res: Response) {
    await this.cartService.addCartLine(payload);
    return res.json({ ok: true });
  }

  @Put('/')
  async updateCartLine(@Body() payload: UpdateCartLineDTO, @Res() res: Response) {
    await this.cartService.updateCartItem(payload);
    return res.json({ ok: true });
  }

  @Delete('/:id')
  async deleteCartItem(@Param('id') id: number, @Res() res: Response) {
    await this.cartService.deleteCartItem(id);
    return res.json({ ok: true });
  }

  @Post('/apply-voucher')
  async applyVoucher(@Body() payload: ApplyVoucherDTO, @Res() res: Response) {
    await this.cartService.applyVoucher(payload);
    return res.json({ ok: true });
  }

  @Post('/voucher')
  async getVoucher(@Res() res: Response) {
    const data = await this.cartService.getVoucherCode();
    return res.json({ data });
  }
}
