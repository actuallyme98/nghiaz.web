import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterBlogDTO {
  @ApiProperty()
  @IsOptional()
  category: string;

  @ApiProperty()
  @IsOptional()
  title: string;
}

export type SortBlogDTO = 'createdAt' | '-createdAt';
