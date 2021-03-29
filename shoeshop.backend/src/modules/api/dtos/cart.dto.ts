import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCartLineDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  cartId: number;

  @ApiProperty()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  productId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  amount: number;
}

export class UpdateCartLineDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  cartItemId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  amount: number;
}

export class ApplyVoucherDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '[cartId] required' })
  cartId: number;

  @ApiProperty()
  @IsNotEmpty({ message: '[code] required' })
  code: string;

  @ApiProperty()
  @IsNotEmpty({ message: '[price] required' })
  price: number;
}
