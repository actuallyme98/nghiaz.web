declare namespace SHOES_API {
  interface PaginationResponse<T> {
    items: T[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
    links?: {
      first: string;
      previous: string;
      next: string;
      last: string;
    };
  }

  interface RegisterParams {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  interface RegisterResponse {}

  interface LoginParams {
    username: string;
    password: string;
  }

  interface LoginResponse {
    expires: number;
    refresh_token: string;
    token: string;
    user: REDUX_STORE.Profile;
  }

  interface GetProfileResponse extends REDUX_STORE.Profile {}

  interface LogoutResponse {
    ok: boolean;
  }

  interface UpdateInfoParams {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dob: string;
    gender: EnumGender;
  }

  interface UpdateInfoResponse {}

  interface UpdatePasswordParams {
    oldPassword: string;
    newPassword: string;
  }

  interface UpdatePasswordResponse {}

  interface CreateDeliveryAddressParams {
    fullName: string;
    phone: string;
    address: string;
    clientId: number;
    cityId: number;
    districtId: number;
    wardId: number;
    isDefault: number;
  }

  interface CreateDeliveryAddressResponse {}

  interface GCity {
    id: number;
    code: number;
    name: string;
    isActive: number;
  }

  interface GDistrict {
    id: number;
    cityId: number;
    code: number;
    name: string;
    isActive: number;
  }

  interface GWard {
    id: number;
    districtID: number;
    code: number;
    name: string;
    isActive: number;
  }

  interface GDeliveryAddress {
    id: number;
    fullName: string;
    phone: string;
    address: string;
    client: GClient;
    city: GCity;
    district: GDistrict;
    ward: GWard;
    isDefault: number;
  }
  interface GetListDeliveryAddressResponse {
    data: [GDeliveryAddress];
  }

  interface UpdateDeliveryAddressArgs {
    id: number;
    fullName: string;
    phone: string;
    address: string;
    clientId: number;
    cityId: number;
    districtId: number;
    wardId: number;
    isDefault: number;
  }

  interface SearchOptions {
    code?: string;
    name?: string;
    categories?: number[];
    colors?: number[];
    sizes?: number[];
    price?: {
      start: number;
      end: number;
    };
    isSpecial?: boolean;
    isSellWell?: boolean;
  }

  type SortOptions = '-currentPrice' | 'currentPrice' | '-createdAt' | '-priority';

  interface AddCartLineParams {
    cartId: number;
    clientId?: number;
    productId: number;
    amount: number;
  }

  interface UpdateCartLineParams {
    clientId: number;
    cartItemId: number;
    amount: number;
  }

  type OrderStatusEnums = 'CONFIRMING' | 'PREPARING' | 'SHIPPING' | 'SUCCESS' | 'FAILED';

  interface OrderItemParams {
    productId: number;
    amount: number;
  }

  interface CreateOrderParams {
    status: OrderStatusEnums;
    reason: string;
    description: string;
    price: number;
    paymentMethod: string;
    discountPrice?: number;
    name: string;
    phone: string;
    address: string;
    clientId: number;
    carrierId: number;
    cityId: number;
    districtId: number;
    wardId: number;
    orderItems: OrderItemParams[];
  }

  interface ListOrderParams {
    clientId: number;
    page: number;
    filters: {
      status?: OrderStatusEnums;
    };
  }

  interface ApplyVoucherParams {
    clientId: number;
    cartId?: number;
    code: string;
    price: number;
  }
}
