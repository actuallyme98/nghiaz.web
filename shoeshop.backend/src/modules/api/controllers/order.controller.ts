import { Controller, Post, Body, Res, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CreateOrderDTO } from '@api/dtos';
import { OrderService } from '@api/services';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/list/:id')
  async listOrders(@Param('id') id: number, @Res() res: Response) {
    const data = await this.orderService.listOrders(id);
    return res.json({ data });
  }

  @Post('/')
  async createOrder(@Body() payload: CreateOrderDTO, @Res() res: Response) {
    const data = await this.orderService.createOrder(payload);
    return res.json({ data });
  }

  @Get('/')
  @ApiQuery({ name: 'code', required: false })
  @ApiQuery({ name: 'clientId', required: false })
  async getOrder(
    @Query('code') code: string,
    @Query('clientId') clientId: number,
    @Res() res: Response,
  ) {
    const data = await this.orderService.getOrder(clientId, code);
    return res.json({ data });
  }

  @Get('/carrier')
  async listCarriers(@Res() res: Response) {
    const data = await this.orderService.listCarriers();
    return res.json({ data });
  }
}
