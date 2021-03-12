import Axios, { AxiosInstance } from 'axios';
import { ApiRouteEnum } from '../enums/api-route.enum';

const SERVER_URL = process.env.SERVER_URL;

const HanleResponse = async (response: any) => {
  const { status, message } = response;
  if (status === false) {
    throw new Error(message);
  }
  return response;
};
export class ApiService {
  private axios: AxiosInstance;

  constructor() {
    if (!SERVER_URL) {
      throw new Error('Server url is missing');
    }
    this.axios = Axios.create({ baseURL: SERVER_URL, withCredentials: true });
    this.axios.interceptors.response.use((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }
      return res;
    });
  }
  public async register(payload: SHOES_API.RegisterParams): Promise<SHOES_API.RegisterResponse> {
    const response = await this.axios.post(ApiRouteEnum.REGISTER, payload);
    return await HanleResponse(response);
  }
  public async login(payload: SHOES_API.LoginParams): Promise<SHOES_API.LoginResponse> {
    const response = await this.axios.post(ApiRouteEnum.LOGIN, payload);
    return await HanleResponse(response);
  }
  public async getProfile(cookie?: string): Promise<SHOES_API.GetProfileResponse> {
    return await this.axios.get(ApiRouteEnum.GET_PROFILE, {
      headers: {
        cookie: cookie || '',
      },
      withCredentials: true,
    });
  }
  public async logout(): Promise<SHOES_API.LogoutResponse> {
    return await this.axios.post(ApiRouteEnum.LOGOUT);
  }

  public async updateUserInfo(
    args: SHOES_API.UpdateInfoParams,
  ): Promise<SHOES_API.UpdateInfoResponse> {
    const response = await this.axios.post(ApiRouteEnum.UPDATE_USER_INFO, args);
    return await HanleResponse(response);
  }
  public async updatePassword(
    args: SHOES_API.UpdatePasswordParams,
  ): Promise<SHOES_API.UpdatePasswordResponse> {
    const response = await this.axios.post(ApiRouteEnum.UPDATE_PASSWORD, args);
    return await HanleResponse(response);
  }
  public async listCities() {
    const response = await this.axios.get(ApiRouteEnum.LIST_CITIES);
    return await HanleResponse(response);
  }
  public async listDistricts(id: number) {
    const response = await this.axios.get(`${ApiRouteEnum.LIST_DISTRICTS}/${id}`);
    return await HanleResponse(response);
  }
  public async listWards(id: number) {
    const response = await this.axios.get(`${ApiRouteEnum.LIST_WARDS}/${id}`);
    return await HanleResponse(response);
  }
  public async listDeliveryAddress(): Promise<SHOES_API.GetListDeliveryAddressResponse> {
    const response = await this.axios.get(ApiRouteEnum.LIST_DELIVERY_ADDRESS);
    return await HanleResponse(response);
  }
  public async createDeliveryAddress(
    args: SHOES_API.CreateDeliveryAddressParams,
  ): Promise<SHOES_API.CreateDeliveryAddressResponse> {
    const response = await this.axios.post(ApiRouteEnum.DELIVERY_ADDRESS, args);
    return await HanleResponse(response);
  }
  public async setDefaultDeliveryAddress(id: number) {
    const response = await this.axios.post(`${ApiRouteEnum.DELIVERY_ADDRESS_SET_DEFAULT}/${id}`);
    return await HanleResponse(response);
  }
  public async deleteDeliveryAddress(id: number) {
    const response = await this.axios.post(`${ApiRouteEnum.DELIVERY_ADDRESS_DELETE}/${id}`);
    return await HanleResponse(response);
  }
  public async updateDeliveryAddress(args: SHOES_API.UpdateDeliveryAddressArgs) {
    const response = await this.axios.post(ApiRouteEnum.DELIVERY_ADDRESS_UPDATE, args);
    return await HanleResponse(response);
  }
}

export default new ApiService();
