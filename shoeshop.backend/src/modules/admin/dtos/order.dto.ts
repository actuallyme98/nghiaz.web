import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type OrderStatusEnums = 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED';

export type FilterOrderTypes = 'date' | 'month' | 'year';

export class FilterOrderDTO {
  @ApiProperty()
  @IsOptional()
  code: string;

  @ApiProperty()
  @IsOptional()
  type: FilterOrderTypes;

  @ApiProperty()
  @IsOptional()
  status: OrderStatusEnums;

  @ApiProperty()
  @IsOptional()
  createdAt: string;
}
