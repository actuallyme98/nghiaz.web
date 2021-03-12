declare namespace SHOES_API {
  interface BaseResponse {
    status?: boolean;
    message?: string;
  }

  interface RegisterParams {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  interface RegisterResponse extends BaseResponse {}

  interface LoginParams {
    username: string;
    password: string;
  }

  interface LoginResponse extends BaseResponse {
    expires: number;
    refresh_token: string;
    token: string;
    user: REDUX_STORE.Profile;
  }

  interface GetProfileResponse extends BaseResponse {
    me: REDUX_STORE.Profile;
  }

  interface LogoutResponse {
    status: boolean;
  }

  interface UpdateInfoParams {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dob: string;
    gender: EnumGender;
  }

  interface UpdateInfoResponse extends BaseResponse {}

  interface UpdatePasswordParams {
    oldPassword: string;
    newPassword: string;
  }

  interface UpdatePasswordResponse extends BaseResponse {}

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

  interface CreateDeliveryAddressResponse extends BaseResponse {}

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
  interface GetListDeliveryAddressResponse extends BaseResponse {
    data: [GDeliveryAddress];
  }

  interface UpdateDeliveryAddressArgs {
    id: number;
    name: string;
    phone: string;
    city: number;
    district: number;
    ward: number;
    address: string;
    isDefault: boolean;
  }
}
