import { IsEmail, IsNotEmpty, isEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { MatchPassword } from '@api/decorators';

export class AuthValidateDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  @MatchPassword({ message: 'password is invalid' })
  password: string;
}

export class AuthRefreshTokenDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  refresh_token: string;
}

export class AuthResponseDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expires: number;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  user: UserDTO;
}

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'invalid' })
  email: string;
}

export class ResetPasswordDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  resetPasswordCode: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  @MatchPassword({ message: 'password is invalid' })
  password: string;
}

export class VerifyUserDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  activeCode: string;
}
