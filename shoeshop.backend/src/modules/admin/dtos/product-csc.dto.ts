import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: number;
}

export class UpdateSizeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: number;
}

export class CreateColorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  code: string;
}

export class UpdateColorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  code: string;
}
