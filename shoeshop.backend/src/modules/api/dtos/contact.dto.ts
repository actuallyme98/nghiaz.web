import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Họ và tên là bắt buộc' })
  from: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Số điện thoại là bắt buộc' })
  phone: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Nội dung là bắt buộc' })
  content: string;
}
