declare namespace ADMIN_API {
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
    id: number;
    pk: number;
    name: string;
    image?: string;
    slug: string;
  }

  interface CreateProductParams {
    id: number;
    code?: string;
    name: string;
    price: number;
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

  interface ListProductsResponse extends REDUX_STORE.IProduct {}

  interface CreateCategoryParams {
    id?: number;
    pk: number;
    name: string;
    slug: string;
  }

  interface UpdateVoucherCodeParams {
    id: number;
    code: string;
    isUsed: number;
  }

  type VoucherType = 'discount_price' | 'discount_percentage' | 'free_ship';

  interface CreateVoucherParams {
    title: string;
    type: VoucherType;
    percentDiscount: number;
    amount: number;
    maxAmount: number;
    quantity: number;
    requireMinPrice: number;
    startDate: string;
    endDate: string;
  }

  interface UpdateVoucherParams {
    id: number;
    title: string;
    type: VoucherType;
    percentDiscount: number;
    amount: number;
    maxAmount: number;
    requireMinPrice: number;
    startDate: string;
    endDate: string;
  }

  type FilterOrderTypes = 'date' | 'month' | 'year';

  interface ListOrderParams {
    paging: {
      page: number;
      limit?: number;
    };
    filters?: {
      code?: string;
      type?: FilterOrderTypes;
      createdAt?: string;
    };
  }

  interface UpdateStatusOrderArgs {
    id: number;
    status: REDUX_STORE.OrderStatusEnums;
  }

  interface ListProductParams {
    paging: {
      page: number;
      limit?: number;
    };
    filters?: {
      colors?: number[];
      categories?: number[];
      sizes?: number[];
    };
  }

  interface CreateBlogCategoryParams {
    name: string;
    slug: string;
  }

  interface UpdateBlogCategoryParams {
    id: number;
    name: string;
    slug: string;
  }

  interface ListBlogParams {
    paging: {
      page: number;
      limit?: number;
    };
    categoryId?: number;
  }

  interface CreateBlogParams {
    title: string;
    shortDescription: string;
    description: string;
    slug: string;
    category: number;
  }
}
