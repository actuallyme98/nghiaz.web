import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrderService } from '@admin/services';
import { OrderStatusEnums } from '@admin/dtos';

import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiResponse({
    status: 200,
  })
  @Get('/list')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async listProducts(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('filters') filters: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.orderService.findAll(
      {
        page,
        limit,
      },
      JSON.parse(filters),
    );
    return res.json({ data });
  }

  @Put('/update-status')
  async updateStatusOrder(
    @Body()
    payload: {
      id: number;
      status: OrderStatusEnums;
    },
    @Res() res: Response,
  ) {
    const { id, status } = payload;
    await this.orderService.updateStatusOrder(id, status);
    return res.json({ ok: true });
  }

  @Delete('/delete/:id')
  async deleteOrder(@Param('id') id: number, @Res() res: Response) {
    await this.orderService.deleteOrder(id);
    return res.json({ ok: true });
  }
}
