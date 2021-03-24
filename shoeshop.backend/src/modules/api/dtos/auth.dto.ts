import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class AuthValidateDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  @IsPhoneNumber('VN', { message: 'invalid' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
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
