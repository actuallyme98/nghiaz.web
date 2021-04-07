import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { UserService } from '../services';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/list')
  @ApiQuery({ name: 'filters', required: false })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  async listUsers(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('filters') filters: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    const data = await this.userService.findAll(
      {
        page,
        limit,
      },
      JSON.parse(filters),
    );
    return res.json({ data });
  }

  @Delete('/:id')
  async deleteUser(@Res() res: Response, @Param('id') id: number) {
    await this.userService.deleteUser(id);
    return res.json({ ok: true });
  }

  @Post('/create')
  async createUser(@Res() res: Response, @Body() payload: CreateUserDTO) {
    await this.userService.createUser(payload);
    return res.json({ ok: true });
  }

  @Put('/update')
  async updateUser(@Res() res: Response, @Body() payload: UpdateUserDTO) {
    await this.userService.updateUser(payload);
    return res.json({ ok: true });
  }
}
