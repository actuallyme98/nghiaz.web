import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  phone: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
