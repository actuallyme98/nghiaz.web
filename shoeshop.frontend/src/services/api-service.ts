import Axios, { AxiosInstance } from 'axios';
import { ApiRouteEnum } from '../enums/api-route.enum';

const SERVER_URL = process.env.SERVER_URL;
export class ApiService {
  private axios: AxiosInstance;

  constructor() {
    if (!SERVER_URL) {
      throw new Error('Server url is missing');
    }
    this.axios = Axios.create({ baseURL: SERVER_URL });
    this.axios.interceptors.response.use((res) => {
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }
      return res;
    });
  }
  public async register(payload: SHOES_API.RegisterParams): Promise<SHOES_API.RegisterResponse> {
    return await this.axios.post(ApiRouteEnum.REGISTER, payload);
  }
}

export default new ApiService();
