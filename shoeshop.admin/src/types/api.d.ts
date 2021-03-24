declare namespace ADMIN_API {
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

  interface GetListSizeResponse {
    id: number;
    name: number;
  }

  interface CreateSizeParams {
    name: number;
  }
  interface UpdateSizeParams {
    id: number;
    name: number;
  }

  interface GetListColorResponse {
    id: number;
    name: string;
    code: string;
  }

  interface CreateColorParams {
    name: string;
    code: string;
  }

  interface UpdateColorParams {
    id: number;
    name: string;
    code: string;
  }

  interface GetListCategoryResponse {
    id?: number;
    name: string;
    image?: string;
    slug?: string;
  }

  interface CreateProductParams {
    id: number;
    code?: string;
    name: string;
    price: number;
    vat: number;
    status: number;
    slug?: string;
    discountPrice?: number;
    currentPrice?: number;
    isSellWell: number;
    isSpecial: number;
    priority: number;
    thumbnail?: string;
    shortDescription?: string;
    description?: string;
    bodyDetail?: string;
    soleDetail?: string;
    quantity: number;
    colorIds: number[];
    categoryIds: number[];
    sizeIds: number[];
  }

  interface ListProductsResponse {
    id: number;
    code?: string;
    name: string;
    price: number;
    vat: number;
    status: boolean;
    slug?: string;
    discountPrice?: number;
    currentPrice?: number;
    isSellWell: boolean;
    isSpecial: boolean;
    priority: number;
    thumbnail?: string;
    shortDescription?: string;
    description?: string;
    bodyDetail?: string;
    soleDetail?: string;
    quantity: number;
  }
}
