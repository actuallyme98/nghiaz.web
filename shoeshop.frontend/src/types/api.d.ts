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
    status: boolean;
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
    clientId: string;
    cityId: number;
    districtId: number;
    wardId: number;
    isDefault: boolean;
  }

  interface CreateDeliveryAddressResponse {}

  interface GCity {
    id: number;
    code: number;
    name: string;
    isActive: boolean;
  }

  interface GDistrict {
    id: number;
    cityId: number;
    code: number;
    name: string;
    isActive: boolean;
  }

  interface GWard {
    id: number;
    districtID: number;
    code: number;
    name: string;
    isActive: boolean;
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
    isDefault: boolean;
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
    isDefault: boolean;
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
}
