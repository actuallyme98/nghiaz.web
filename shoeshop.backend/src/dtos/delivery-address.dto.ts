export interface UpdateDeliveryAddressArgs {
  id: number;
  name: string;
  phone: string;
  city: number;
  district: number;
  ward: number;
  address: string;
  isDefault: boolean;
}
