import Axios from 'axios';
import { ApiRouteEnum } from '../enums/api-route';

const HanleResponse = async (response: any) => {
  const { status, message } = response;
  if (status === false) {
    throw new Error(message);
  }
  return response;
};
export class ApiService {
  public async login(payload: ADMIN_API.LoginParams): Promise<ADMIN_API.LoginResponse> {
    const response = await Axios.post(ApiRouteEnum.LOGIN, payload);
    return await HanleResponse(response);
  }
  public async getProfile(): Promise<ADMIN_API.GetProfileResponse> {
    return await Axios.get(ApiRouteEnum.GET_PROFILE);
  }
  public async logout(): Promise<ADMIN_API.LogoutResponse> {
    return await Axios.post(ApiRouteEnum.LOGOUT);
  }
}

export default new ApiService();
