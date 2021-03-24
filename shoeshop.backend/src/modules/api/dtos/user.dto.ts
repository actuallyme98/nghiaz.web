import { IsString, IsEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { GenderEnum } from '@api/enums';

export class ClientDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  dob: string;
}

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  client: ClientDTO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateUserDTO {
  @ApiProperty()
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  password: string;
}

export class UpdateInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  birthday: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  gender: string;
}
