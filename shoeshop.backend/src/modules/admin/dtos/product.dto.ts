import { IsNotEmpty, IsEmpty, IsOptional } from 'class-validator';
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
  status: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  slug?: string;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
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
  @IsNotEmpty({ message: 'Color required' })
  colorIds: number[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Category required' })
  categoryIds: number[];

  @ApiProperty()
  @IsNotEmpty({ message: 'Size required' })
  sizeIds: number[];
}

export class FilterProductDTO {
  @ApiProperty()
  @IsOptional({ message: 'Color required' })
  colors: number[];

  @ApiProperty()
  @IsOptional({ message: 'Category required' })
  categories: number[];

  @ApiProperty()
  @IsOptional({ message: 'Size required' })
  sizes: number[];
}
