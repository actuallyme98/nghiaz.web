import Axios from 'axios';
import { ApiRouteEnum } from '../enums/api-route';
export class ApiService {
  public async login(payload: ADMIN_API.LoginParams): Promise<ADMIN_API.LoginResponse> {
    return await Axios.post(ApiRouteEnum.LOGIN, payload);
  }
  public async getProfile() {
    return await Axios.get(ApiRouteEnum.GET_PROFILE);
  }
  public async logout(): Promise<ADMIN_API.LogoutResponse> {
    return await Axios.post(ApiRouteEnum.LOGOUT);
  }
  public async listSizes() {
    return await Axios.get(ApiRouteEnum.LIST_SIZES);
  }
  public async createSize(payload: ADMIN_API.CreateSizeParams) {
    return await Axios.post(ApiRouteEnum.SIZES, payload);
  }
  public async updateSize(payload: ADMIN_API.UpdateSizeParams) {
    return await Axios.put(ApiRouteEnum.UPDATE_SIZE, payload);
  }
  public async deleteSize(id: number) {
    return await Axios.delete(`${ApiRouteEnum.SIZES}/${id}`);
  }
  public async listColors() {
    return await Axios.get(ApiRouteEnum.LIST_COLORS);
  }
  public async createColor(payload: ADMIN_API.CreateColorParams) {
    return await Axios.post(ApiRouteEnum.COLORS, payload);
  }
  public async updateColor(payload: ADMIN_API.UpdateColorParams) {
    return await Axios.put(ApiRouteEnum.UPDATE_COLOR, payload);
  }
  public async deleteColor(id: number) {
    return await Axios.delete(`${ApiRouteEnum.COLORS}/${id}`);
  }
  public async listCategories() {
    return await Axios.get(ApiRouteEnum.CATEGORIES_LIST);
  }
  public async createProduct(args: ADMIN_API.CreateProductParams) {
    return await Axios.post(ApiRouteEnum.CREATE_PRODUCT, args);
  }
  public async updateThumbnailProduct(args: FormData, id: number) {
    return await Axios.put(`${ApiRouteEnum.UPDATE_PRODUCT_THUMBNAIL}/${id}`, args);
  }
  public async updateImagesProduct(args: FormData, id: number) {
    return await Axios.put(`${ApiRouteEnum.UPDATE_PRODUCT_IMAGES}/${id}`, args);
  }
  public async listProducts(args: ADMIN_API.ListProductParams) {
    const { paging, filters } = args;
    return await Axios.get(ApiRouteEnum.LIST_PRODUCTS, {
      params: {
        ...paging,
        filters: filters ? filters : {},
      },
    });
  }
  public async deleteProduct(id: number) {
    return await Axios.delete(`${ApiRouteEnum.DELETE_PRODUCT}/${id}`);
  }
  public async createCategory(args: ADMIN_API.CreateCategoryParams) {
    return await Axios.post(ApiRouteEnum.CATEGORIES, args);
  }
  public async updateCategory(args: ADMIN_API.CreateCategoryParams) {
    return await Axios.put(ApiRouteEnum.CATEGORIES, args);
  }
  public async deleteCategory(id: number) {
    return await Axios.delete(`${ApiRouteEnum.CATEGORIES}/${id}`);
  }
  public async updateThumnailCategory(args: FormData, id: number) {
    return await Axios.put(`${ApiRouteEnum.CATEGORIES_THUMBNAIL}/${id}`, args);
  }
  public async listVouchers() {
    return await Axios.get(ApiRouteEnum.LIST_VOUCHER);
  }
  public async createVoucher(args: ADMIN_API.CreateVoucherParams) {
    return await Axios.post(ApiRouteEnum.CREATE_VOUCHER, args);
  }
  public async updateVoucher(args: ADMIN_API.UpdateVoucherParams) {
    return await Axios.put(ApiRouteEnum.UPDATE_VOUCHER, args);
  }
  public async deleteVoucher(id: number) {
    return await Axios.delete(`${ApiRouteEnum.DELETE_VOUCHER}/${id}`);
  }
  public async updateVoucherCode(args: ADMIN_API.UpdateVoucherCodeParams) {
    return await Axios.put(ApiRouteEnum.UPDATE_VOUCHER_CODE, args);
  }
  public async deleteVoucherCode(id: number) {
    return await Axios.delete(`${ApiRouteEnum.DELETE_VOUCHER_CODE}/${id}`);
  }
  public async listOrders(args: ADMIN_API.ListOrderParams) {
    const { filters, paging } = args;
    return await Axios.get(ApiRouteEnum.LIST_ORDER, {
      params: {
        ...paging,
        filters,
      },
    });
  }
  public async updateStatusOrder(args: ADMIN_API.UpdateStatusOrderArgs) {
    return await Axios.put(ApiRouteEnum.UPDATE_ORDER, args);
  }
  public async deleteOrder(id: number) {
    return await Axios.delete(`${ApiRouteEnum.DELETE_ORDER}/${id}`);
  }
  public async listBlogCategories() {
    return await Axios.get(ApiRouteEnum.LIST_BLOG_CATEGORY);
  }
  public async createBlogCategory(args: ADMIN_API.CreateBlogCategoryParams) {
    return await Axios.post(ApiRouteEnum.CREATE_BLOG_CATEGORY, args);
  }
  public async updateBlogCategory(args: ADMIN_API.UpdateBlogCategoryParams) {
    return await Axios.put(ApiRouteEnum.UPDATE_BLOG_CATEGORY, args);
  }
  public async listBlog(args: ADMIN_API.ListBlogParams) {
    const { paging, categoryId } = args;
    return await Axios.get(ApiRouteEnum.LIST_BLOG, {
      params: {
        ...paging,
        categoryId,
      },
    });
  }
  public async createBlog(args: ADMIN_API.CreateBlogParams) {
    return await Axios.post(ApiRouteEnum.CREATE_BLOG, args);
  }
  public async updateThumbnailBlog(id: number, data: FormData) {
    return await Axios.put(`${ApiRouteEnum.UPDATE_THUMBNAIL_BLOG}/${id}`, data);
  }
  public async deleteBlog(id: number) {
    return await Axios.delete(`${ApiRouteEnum.DELETE_BLOG}/${id}`);
  }
  public async deleteBlogCategory(id: number) {
    return await Axios.delete(`${ApiRouteEnum.DELETE_CATEGORY_BLOG}/${id}`);
  }
  public async listUsers(args: ADMIN_API.ListUserParams) {
    const { paging, filters = {} } = args;
    return await Axios.get(ApiRouteEnum.LIST_USERS, {
      params: {
        ...paging,
        filters,
      },
    });
  }
  public async deleteUser(id: number) {
    return await Axios.delete(`${ApiRouteEnum.USER}/${id}`);
  }
  public async createUser(args: ADMIN_API.CreateUserParams) {
    return await Axios.post(ApiRouteEnum.CREATE_USER, args);
  }
  public async updateUser(args: ADMIN_API.UpdateUserParams) {
    return await Axios.put(ApiRouteEnum.UPDATE_USER, args);
  }
}

export default new ApiService();
