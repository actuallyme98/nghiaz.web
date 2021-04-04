import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import { Store } from 'redux';

// services
import ApiService from '../../services/api-service';

export const loginAction = createTypeAsyncAction(
  'LOGIN_ACTION',
  async (args: ADMIN_API.LoginParams) => {
    return await ApiService.login(args);
  },
);

export const getProfileAction = createTypeAsyncAction('GET_PROFILE_ACTION', async () => {
  return await ApiService.getProfile();
});

export const logOutAction = createTypeAsyncAction('LOGOUT_ACTION', async () => {
  return await ApiService.logout();
});

export const initializeApp = createTypeAsyncAction<any, void, Store>(
  'INITIALIZE_APP',
  async (args, { dispatch }) => {
    try {
      await dispatch(listSizesAction());
      await dispatch(listColorsAction());
      await dispatch(listCategoriesAction());
      await dispatch(listVoucherAction());
      await dispatch(listBlogCategoriesAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listSizesAction = createTypeAsyncAction('LIST_SIZES_ACTION', async () => {
  try {
    const response = await ApiService.listSizes();
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});

export const createSizeAction = createTypeAsyncAction<ADMIN_API.CreateSizeParams, void, Store>(
  'CREATE_SIZE_ACTION',
  async (args: ADMIN_API.CreateSizeParams, { dispatch }) => {
    try {
      await ApiService.createSize(args);
      await dispatch(listSizesAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateSizeAction = createTypeAsyncAction<ADMIN_API.UpdateSizeParams, void, Store>(
  'UPDATE_SIZE_ACTION',
  async (args: ADMIN_API.UpdateSizeParams, { dispatch }) => {
    try {
      await ApiService.updateSize(args);
      await dispatch(listSizesAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const deleteSizeAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_SIZE_ACION',
  async (args: number, { dispatch }) => {
    try {
      await ApiService.deleteSize(args);
      await dispatch(listSizesAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listColorsAction = createTypeAsyncAction('LIST_COLORS_ACTION', async () => {
  try {
    const response = await ApiService.listColors();
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});

export const createColorAction = createTypeAsyncAction<ADMIN_API.CreateColorParams, void, Store>(
  'CREATE_COLOR_ACTION',
  async (args: ADMIN_API.CreateColorParams, { dispatch }) => {
    try {
      await ApiService.createColor(args);
      await dispatch(listColorsAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateColorAction = createTypeAsyncAction<ADMIN_API.UpdateColorParams, void, Store>(
  'UPDATE_COLOR_ACTION',
  async (args: ADMIN_API.UpdateColorParams, { dispatch }) => {
    try {
      await ApiService.updateColor(args);
      await dispatch(listColorsAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const deleteColorAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_COLOR_ACION',
  async (args: number, { dispatch }) => {
    try {
      await ApiService.deleteColor(args);
      await dispatch(listColorsAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listCategoriesAction = createTypeAsyncAction('LIST_CATEGORIES_ACTION', async () => {
  try {
    const response = await ApiService.listCategories();
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
});

export const createProductAction = createTypeAsyncAction(
  'CREATE_PRODUCT_ACTION',
  async (args: ADMIN_API.CreateProductParams) => {
    try {
      return await ApiService.createProduct(args);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateThumbnailProductAction = createTypeAsyncAction(
  'UPDATE_THUMBNAIL_ACTION',
  async (args: { data: FormData; id: number }) => {
    try {
      const { data, id } = args;
      return await ApiService.updateThumbnailProduct(data, id);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateImagesProductAction = createTypeAsyncAction(
  'UPDATE_THUMBNAIL_ACTION',
  async (args: { data: FormData; id: number }) => {
    try {
      const { data, id } = args;
      return await ApiService.updateImagesProduct(data, id);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listProductsAction = createTypeAsyncAction(
  'LIST_PRODUCTS_ACTION',
  async (args: ADMIN_API.ListProductParams) => {
    try {
      const response = await ApiService.listProducts(args);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const deleteProductAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_COLOR_ACION',
  async (args: number, { dispatch }) => {
    try {
      await ApiService.deleteProduct(args);
      await dispatch(listProductsAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const createCategoryAction = createTypeAsyncAction<
  ADMIN_API.CreateCategoryParams,
  void,
  Store
>('CREATE_CATEGORY_ACTION', async (args: ADMIN_API.CreateCategoryParams, { dispatch }) => {
  try {
    await ApiService.createCategory(args);
    await dispatch(listCategoriesAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const updateCategoryAction = createTypeAsyncAction<
  ADMIN_API.CreateCategoryParams,
  void,
  Store
>('CREATE_CATEGORY_ACTION', async (args: ADMIN_API.CreateCategoryParams, { dispatch }) => {
  try {
    await ApiService.updateCategory(args);
    await dispatch(listCategoriesAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const deleteCategoryAction = createTypeAsyncAction<number, void, Store>(
  'CREATE_CATEGORY_ACTION',
  async (id: number, { dispatch }) => {
    try {
      await ApiService.deleteCategory(id);
      await dispatch(listCategoriesAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateThumnailCategoryAction = createTypeAsyncAction(
  'UPDATE_THUMNAIL_CATEGORY_ACTION',
  async (args: { id: number; data: FormData }) => {
    try {
      const { id, data } = args;
      await ApiService.updateThumnailCategory(data, id);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listVoucherAction = createTypeAsyncAction('LIST_VOUCHERS_ACTION', async () => {
  try {
    const response = await ApiService.listVouchers();
    return response.data;
  } catch (err) {
    //ignore errr
  }
});

export const createVoucherAction = createTypeAsyncAction<
  ADMIN_API.CreateVoucherParams,
  void,
  Store
>('CREATE_VOUCHER_ACTION', async (args: ADMIN_API.CreateVoucherParams, { dispatch }) => {
  try {
    await ApiService.createVoucher(args);
    await dispatch(listVoucherAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const updateVoucherAction = createTypeAsyncAction<
  ADMIN_API.UpdateVoucherParams,
  void,
  Store
>('UPDATE_VOUCHER_ACTION', async (args: ADMIN_API.UpdateVoucherParams, { dispatch }) => {
  try {
    await ApiService.updateVoucher(args);
    await dispatch(listVoucherAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const deleteVoucherAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_VOUCHER_ACTION',
  async (args: number, { dispatch }) => {
    try {
      await ApiService.deleteVoucher(args);
      await dispatch(listVoucherAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateVoucherCodeAction = createTypeAsyncAction<
  ADMIN_API.UpdateVoucherCodeParams,
  void,
  Store
>('UPDATE_VOUCHER_CODE_ACTION', async (args: ADMIN_API.UpdateVoucherCodeParams, { dispatch }) => {
  try {
    await ApiService.updateVoucherCode(args);
    await dispatch(listVoucherAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const deleteVoucherCodeAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_VOUCHER_CODE_ACTION',
  async (args: number, { dispatch }) => {
    try {
      await ApiService.deleteVoucherCode(args);
      await dispatch(listVoucherAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listOrdersAction = createTypeAsyncAction(
  'LIST_ORDER_ACTION',
  async (args: ADMIN_API.ListOrderParams) => {
    try {
      const response = await ApiService.listOrders(args);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateStatusOrderAction = createTypeAsyncAction(
  'UPDATE_STATUS_ORDER_ACTION',
  async (args: ADMIN_API.UpdateStatusOrderArgs) => {
    try {
      return await ApiService.updateStatusOrder(args);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const deleteOrderAction = createTypeAsyncAction(
  'DELETE_ORDER_ACTION',
  async (id: number) => {
    try {
      return await ApiService.deleteOrder(id);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listBlogCategoriesAction = createTypeAsyncAction(
  'LIST_BLOG_CATEGORIES_ACTION',
  async () => {
    try {
      const response = await ApiService.listBlogCategories();
      return response.data;
    } catch (err) {
      // ignore err
    }
  },
);

export const createBlogCategoryAction = createTypeAsyncAction<
  ADMIN_API.CreateBlogCategoryParams,
  void,
  Store
>('CREATE_BLOG_CATEGORY_ACTION', async (args: ADMIN_API.CreateBlogCategoryParams, { dispatch }) => {
  try {
    await ApiService.createBlogCategory(args);
    await dispatch(listBlogCategoriesAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const updateBlogCategoryAction = createTypeAsyncAction<
  ADMIN_API.UpdateBlogCategoryParams,
  void,
  Store
>('CREATE_BLOG_CATEGORY_ACTION', async (args: ADMIN_API.UpdateBlogCategoryParams, { dispatch }) => {
  try {
    await ApiService.updateBlogCategory(args);
    await dispatch(listBlogCategoriesAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const deleteBlogCategoryAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_BLOG_CATEGORY_ACTION',
  async (args: number, { dispatch }) => {
    try {
      await ApiService.deleteBlogCategory(args);
      await dispatch(listBlogCategoriesAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listBlogAction = createTypeAsyncAction(
  'LIST_BLOG_CATEGORY_ACTION',
  async (args: ADMIN_API.ListBlogParams) => {
    try {
      const response = await ApiService.listBlog(args);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const createBlogAction = createTypeAsyncAction(
  'CREATE_BLOG_CATEGORY_ACTION',
  async (args: ADMIN_API.CreateBlogParams) => {
    try {
      const response = await ApiService.createBlog(args);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const deleteBlogAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_BLOG_ACTION',
  async (args: number) => {
    try {
      await ApiService.deleteBlog(args);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateThumbnailBlogAction = createTypeAsyncAction(
  'UPDATE_THUMBNAIL_BLOG__ACTION',
  async (args: { id: number; data: FormData }) => {
    try {
      await ApiService.updateThumbnailBlog(args.id, args.data);
    } catch (err) {
      throw new Error(err);
    }
  },
);
