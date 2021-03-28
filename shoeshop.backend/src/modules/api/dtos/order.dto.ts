import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export type OrderStatusEnums = 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  status: OrderStatusEnums;

  @ApiPropertyOptional()
  @IsOptional()
  reason: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  paymentMethod: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  clientId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  carrierId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  cityId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  districtId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  wardId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  orderItems: OrderItemDTO[];
}

export class OrderItemDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  productId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  amount: number;
}

export interface FilterOrderDTO {
  status?: OrderStatusEnums;
}
