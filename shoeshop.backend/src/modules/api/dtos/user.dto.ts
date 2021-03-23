import { MaxLength, IsNotEmpty, IsOptional, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatusType } from '@api/entities/user.entity';

export class UserDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: UserStatusType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
