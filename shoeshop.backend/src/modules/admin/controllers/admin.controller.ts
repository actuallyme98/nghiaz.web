import {
  Controller,
  Get,
  Render,
  Post,
  Req,
  Res,
  UseGuards,
  UseFilters,
  Redirect,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from '@admin/services';
import {} from '@api/dtos';
import { Response, Request } from 'express';

import { LoginGuard } from '../common/guards/login.guard';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { AuthExceptionFilter } from '../common/filters/auth-exceptions.filter';

@ApiBearerAuth()
@ApiTags('admin')
@Controller()
@UseFilters(AuthExceptionFilter)
export class AdminController {
  constructor(private adminService: AdminService) {}
}
