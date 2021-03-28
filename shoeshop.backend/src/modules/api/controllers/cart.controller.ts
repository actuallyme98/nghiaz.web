import { Controller, Post, Body, Res, Delete, Param, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddCartLineDTO, UpdateCartLineDTO } from '@api/dtos';
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
  async addCartLine(@Body() payload: AddCartLineDTO) {
    return await this.cartService.addCartLine(payload);
  }

  @Put('/')
  async updateCartLine(@Body() payload: UpdateCartLineDTO) {
    return await this.cartService.updateCartItem(payload);
  }

  @Delete('/:id')
  async deleteCartItem(@Param('id') id: number) {
    return await this.cartService.deleteCartItem(id);
  }
}
