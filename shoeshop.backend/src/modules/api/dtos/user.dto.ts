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
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  password: string;
}

export class UpdateInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Họ và tên phải là chuỗi ký tự' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Họ và tên phải là chuỗi ký tự' })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Số điện thoại phải là chuỗi ký tự' })
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email không được trống' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Chọn ngày hợp lệ' })
  birthday: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Chọn giới tính hợp lệ' })
  gender: string;
}

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  newPassword: string;
}
