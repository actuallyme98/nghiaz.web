import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthValidateDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  password: string;
}

export class FilterUserDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  phone: string;
}

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '[username] required' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: '[password] required' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: '[firstName] required' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: '[lastName] required' })
  lastName: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '[id] required' })
  id: number;

  @ApiProperty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsOptional()
  dob: string;
}
