import { IsNotEmpty, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsEmpty()
  code?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  vat: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  status: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  slug?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  discountPrice?: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  currentPrice?: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  isSellWell: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  isSpecial: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  priority: number;

  @ApiProperty()
  @IsEmpty()
  thumbnail?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  shortDescription?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  description?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  bodyDetail?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  soleDetail?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  colorIds: number[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  categoryIds: number[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  sizeIds: number[];
}
