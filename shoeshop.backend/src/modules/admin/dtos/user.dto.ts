import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthValidateDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  password: string;
}
