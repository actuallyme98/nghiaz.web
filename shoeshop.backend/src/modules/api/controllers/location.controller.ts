import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';

import { LocationService } from '@api/services';

@ApiBearerAuth()
@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(
    private configService: ConfigService,
    private readonly locationService: LocationService,
  ) {}
  @ApiResponse({
    status: 200,
  })
  @Get('/cities')
  async listCities(@Res() res: Response) {
    const data = await this.locationService.listCities();
    return res.json({ data });
  }

  @ApiResponse({
    status: 200,
  })
  @Get('/districts/:id')
  async listDists(@Res() res: Response, @Param('id') id: number) {
    const data = await this.locationService.listDistricts(id);
    return res.json({ data });
  }

  @ApiResponse({
    status: 200,
  })
  @Get('/wards/:id')
  async listWards(@Res() res: Response, @Param('id') id: number) {
    const data = await this.locationService.listWards(id);
    return res.json({ data });
  }
}
