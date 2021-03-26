import Axios from 'axios';
import { ApiRouteEnum } from '../enums/api-route';

const HanleResponse = async (response: any) => {
  if (response.data) {
    return response.data;
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
  public async listSizes(): Promise<ADMIN_API.GetListSizeResponse[]> {
    const response = await Axios.get(ApiRouteEnum.LIST_SIZES);
    return await HanleResponse(response);
  }
  public async createSize(payload: ADMIN_API.CreateSizeParams) {
    const response = await Axios.post(ApiRouteEnum.SIZES, payload);
    return await HanleResponse(response);
  }
  public async updateSize(payload: ADMIN_API.UpdateSizeParams) {
    const response = await Axios.put(ApiRouteEnum.UPDATE_SIZE, payload);
    return await HanleResponse(response);
  }
  public async deleteSize(id: number) {
    const response = await Axios.delete(`${ApiRouteEnum.SIZES}/${id}`);
    return await HanleResponse(response);
  }
  public async listColors(): Promise<ADMIN_API.GetListColorResponse[]> {
    const response = await Axios.get(ApiRouteEnum.LIST_COLORS);
    return await HanleResponse(response);
  }
  public async createColor(payload: ADMIN_API.CreateColorParams) {
    const response = await Axios.post(ApiRouteEnum.COLORS, payload);
    return await HanleResponse(response);
  }
  public async updateColor(payload: ADMIN_API.UpdateColorParams) {
    const response = await Axios.put(ApiRouteEnum.UPDATE_COLOR, payload);
    return await HanleResponse(response);
  }
  public async deleteColor(id: number) {
    const response = await Axios.delete(`${ApiRouteEnum.COLORS}/${id}`);
    return await HanleResponse(response);
  }
  public async listCategories(): Promise<ADMIN_API.GetListCategoryResponse[]> {
    const response = await Axios.get(ApiRouteEnum.CATEGORIES_LIST);
    return await HanleResponse(response);
  }
  public async createProduct(args: ADMIN_API.CreateProductParams) {
    const response = await Axios.post(ApiRouteEnum.CREATE_PRODUCT, args);
    return await HanleResponse(response);
  }
  public async updateThumbnailProduct(args: FormData, id: number) {
    const response = await Axios.put(`${ApiRouteEnum.UPDATE_PRODUCT_THUMBNAIL}/${id}`, args);
    return await HanleResponse(response);
  }
  public async updateImagesProduct(args: FormData, id: number) {
    const response = await Axios.put(`${ApiRouteEnum.UPDATE_PRODUCT_IMAGES}/${id}`, args);
    return await HanleResponse(response);
  }
  public async listProducts(): Promise<ADMIN_API.ListProductsResponse[]> {
    const response = await Axios.get(ApiRouteEnum.LIST_PRODUCTS);
    return await HanleResponse(response);
  }
  public async deleteProduct(id: number) {
    const response = await Axios.delete(`${ApiRouteEnum.DELETE_PRODUCT}/${id}`);
    return await HanleResponse(response);
  }
  public async createCategory(args: ADMIN_API.CreateCategoryParams) {
    const response = await Axios.post(ApiRouteEnum.CATEGORIES, args);
    return await HanleResponse(response);
  }
  public async updateCategory(args: ADMIN_API.CreateCategoryParams) {
    const response = await Axios.put(ApiRouteEnum.CATEGORIES, args);
    return await HanleResponse(response);
  }
  public async deleteCategory(id: number) {
    const response = await Axios.delete(`${ApiRouteEnum.CATEGORIES}/${id}`);
    return await HanleResponse(response);
  }
  public async updateThumnailCategory(args: FormData, id: number) {
    const response = await Axios.put(`${ApiRouteEnum.CATEGORIES_THUMBNAIL}/${id}`, args);
    return await HanleResponse(response);
  }
}

export default new ApiService();
