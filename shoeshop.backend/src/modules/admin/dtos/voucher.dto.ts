import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type VoucherType = 'discount_price' | 'discount_percentage' | 'free_ship';

export class CreateVoucherDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'type is required' })
  type: VoucherType;

  @ApiProperty()
  @IsOptional()
  percentDiscount: number;

  @ApiProperty()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsOptional()
  maxAmount: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'quantity is required' })
  quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'min price is required' })
  requireMinPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'startDate is required' })
  startDate: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'endDate is required' })
  endDate: string;
}

export class UpdateVoucherDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'type is required' })
  type: VoucherType;

  @ApiProperty()
  @IsOptional()
  percentDiscount: number;

  @ApiProperty()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsOptional()
  maxAmount: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'min price is required' })
  requireMinPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'startDate is required' })
  startDate: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'endDate is required' })
  endDate: string;
}

export class UpdateVoucherCodeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'code required' })
  code: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'isUsed required' })
  isUsed: number;
}
