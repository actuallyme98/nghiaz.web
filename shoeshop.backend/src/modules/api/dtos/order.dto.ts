import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export type OrderStatusEnums = 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  status: OrderStatusEnums;

  @ApiPropertyOptional()
  @IsOptional()
  reason: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  discountPrice: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Giá không được trống' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phương thức thanh toán không được trống' })
  paymentMethod: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tên không được trống' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Điện thoại không được trống' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Địa chỉ không được trống' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Client is required' })
  clientId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phương thức giao hàng không được trống' })
  carrierId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Thành phố không được trống' })
  cityId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Quận/huyện không được trống' })
  districtId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phường/xã không được trống' })
  wardId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phải mua ít nhất 1 sản phẩm' })
  orderItems: OrderItemDTO[];
}

export class OrderItemDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Sản phẩm ?' })
  productId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng chọn màu' })
  color: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng chọn kích cỡ' })
  size: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Số lượng phải lớn hơn 1' })
  amount: number;
}

export interface FilterOrderDTO {
  status?: OrderStatusEnums;
}
