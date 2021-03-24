import { IsEmpty, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientDTO } from '.';
import { City, District, Ward } from '../entities';

export class DeliveryAddressDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isDefault: number;

  @ApiProperty()
  client: ClientDTO;

  @ApiProperty()
  city: City;

  @ApiProperty()
  district: District;

  @ApiProperty()
  ward: Ward;
}

export class CreateAddressDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  cityId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  districtId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  wardId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  isDefault: number;
}

export class UpdateAddressDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  clientId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  cityId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  districtId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  wardId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Required' })
  isDefault: number;
}
