import Axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiRouteEnum } from '../enums/api-route.enum';

const SERVER_URL = process.env.SERVER_URL;
export class ApiService {
  private axios: AxiosInstance;

  constructor() {
    if (!SERVER_URL) {
      throw new Error('Server url is missing');
    }
    this.axios = Axios.create({ baseURL: SERVER_URL, withCredentials: true });
    this.axios.interceptors.response.use(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          return res.data;
        }
        return res;
      },
      (err: AxiosError) => {
        throw new Error(err.response?.data.message || err);
      },
    );
  }
  public async register(payload: SHOES_API.RegisterParams): Promise<SHOES_API.RegisterResponse> {
    return await this.axios.post(ApiRouteEnum.REGISTER, payload);
  }
  public async login(payload: SHOES_API.LoginParams): Promise<SHOES_API.LoginResponse> {
    return await this.axios.post(ApiRouteEnum.LOGIN, payload);
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
    return await this.axios.put(ApiRouteEnum.UPDATE_USER_INFO, args);
  }
  public async updatePassword(
    args: SHOES_API.UpdatePasswordParams,
  ): Promise<SHOES_API.UpdatePasswordResponse> {
    return await this.axios.put(ApiRouteEnum.UPDATE_PASSWORD, args);
  }
  public async listCities() {
    return await this.axios.get(ApiRouteEnum.LIST_CITIES);
  }
  public async listDistricts(id: number) {
    return await this.axios.get(`${ApiRouteEnum.LIST_DISTRICTS}/${id}`);
  }
  public async listWards(id: number) {
    return await this.axios.get(`${ApiRouteEnum.LIST_WARDS}/${id}`);
  }
  public async listDeliveryAddress(): Promise<SHOES_API.GetListDeliveryAddressResponse> {
    return await this.axios.get(ApiRouteEnum.LIST_DELIVERY_ADDRESS);
  }
  public async createDeliveryAddress(
    args: SHOES_API.CreateDeliveryAddressParams,
  ): Promise<SHOES_API.CreateDeliveryAddressResponse> {
    return await this.axios.post(ApiRouteEnum.DELIVERY_ADDRESS, args);
  }
  public async setDefaultDeliveryAddress(id: number) {
    return await this.axios.put(`${ApiRouteEnum.DELIVERY_ADDRESS_SET_DEFAULT}/${id}`);
  }
  public async deleteDeliveryAddress(id: number) {
    return await this.axios.delete(`${ApiRouteEnum.DELIVERY_ADDRESS_DELETE}/${id}`);
  }
  public async updateDeliveryAddress(args: SHOES_API.UpdateDeliveryAddressArgs) {
    return await this.axios.put(ApiRouteEnum.DELIVERY_ADDRESS_UPDATE, args);
  }
  public async updateAvatar(args: FormData) {
    return await this.axios.post(ApiRouteEnum.UPDATE_AVATAR, args);
  }

  // products
  public async listProducts(args: {
    page?: number;
    filters?: SHOES_API.SearchOptions;
    sorts?: SHOES_API.SortOptions;
  }) {
    const { page = 1, sorts, filters } = args;
    return await this.axios.get(ApiRouteEnum.LIST_PRODUCT, {
      params: {
        page,
        sorts,
        filters,
      },
    });
  }
  public async product(code: string) {
    return await this.axios.get(`${ApiRouteEnum.PRODUCT}/${code}`);
  }
  public async listsizes() {
    return await this.axios.get(ApiRouteEnum.LIST_SIZES);
  }
  public async listColors() {
    return await this.axios.get(ApiRouteEnum.LIST_COLORS);
  }
  public async listCategories() {
    return await this.axios.get(ApiRouteEnum.LIST_CATEGORIES);
  }
  public async getCategory(slug: string) {
    return await this.axios.get(`${ApiRouteEnum.CATEGORY}/${slug}`);
  }
  public async getCartLine(clientId: number) {
    return await this.axios.get(`${ApiRouteEnum.CART_LINE}/${clientId}`);
  }
  public async addCartLine(args: SHOES_API.AddCartLineParams) {
    return await this.axios.post(ApiRouteEnum.CART_LINE, args);
  }
  public async removeItemCartLine(args: SHOES_API.UpdateCartLineParams) {
    return await this.axios.put(ApiRouteEnum.CART_LINE, args);
  }
  public async deleteCartItem(id: number) {
    return await this.axios.delete(`${ApiRouteEnum.CART_LINE}/${id}`);
  }
  public async listOrders(args: SHOES_API.ListOrderParams) {
    const { clientId, filters, page } = args;
    return await this.axios.get(`${ApiRouteEnum.LIST_ORDER}/${clientId}`, {
      params: {
        page,
        filters,
      },
    });
  }
  public async createOrder(args: SHOES_API.CreateOrderParams) {
    return await this.axios.post(ApiRouteEnum.ORDER, args);
  }
  public async getOrder(clientId: number, code: string) {
    return await this.axios.get(ApiRouteEnum.ORDER, {
      params: {
        clientId,
        code,
      },
    });
  }
  public async listCarriers() {
    return await this.axios.get(ApiRouteEnum.LIST_CARRIER);
  }
  public async applyVoucher(args: SHOES_API.ApplyVoucherParams) {
    return await this.axios.post(ApiRouteEnum.APPLY_VOUCHER, args);
  }
  public async getProductRelated(id: number) {
    return await this.axios.get(`${ApiRouteEnum.PRODUCT_RELATED}/${id}`);
  }
  public async listBlogCategories() {
    return await this.axios.get(ApiRouteEnum.LIST_BLOG_CATEGORIES);
  }
  public async listBlogs(args: SHOES_API.ListBlogParams) {
    const { paging, filters, sort } = args;
    return await this.axios.get(ApiRouteEnum.LIST_BLOGS, {
      params: {
        ...paging,
        filters,
        sort,
      },
    });
  }
  public async getBlog(slug: string) {
    return await this.axios.get(ApiRouteEnum.GET_BLOG, {
      params: {
        slug,
      },
    });
  }
}

export default new ApiService();
