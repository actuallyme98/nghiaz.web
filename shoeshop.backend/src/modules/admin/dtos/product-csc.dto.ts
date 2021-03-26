import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: number;
}

export class UpdateSizeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: number;
}

export class CreateColorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  code: string;
}

export class UpdateColorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  code: string;
}

export class CreateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  pk: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  slug: string;
}

export class UpdateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  pk: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  slug: string;
}
