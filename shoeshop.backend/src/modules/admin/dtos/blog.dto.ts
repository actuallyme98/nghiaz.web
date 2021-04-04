import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogCategoryDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  slug: string;
}

export class UpdateBlogCategoryDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  slug: string;
}

export class CreateBlogDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  title: string;

  @ApiProperty()
  @IsOptional()
  shortDescription: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  slug: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  category: number;
}
