import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import { Store } from 'redux';

// services
import ApiService from '../../services/api-service';

// helpers
import SystemHelper from '../../helpers/system.helper';

export const detectMobile = createTypeAction<string, boolean>(
  'DETECT_MOBILE',
  (userAgent: string) => {
    return SystemHelper.detectMobile(userAgent);
  },
);

export const openCartDrawer = createTypeAction('OPEN_CART_DRAWER', (open: boolean) => open);

export const registerAction = createTypeAsyncAction(
  'REGISTER_ACTION',
  async (args: SHOES_API.RegisterParams) => {
    return await ApiService.register(args);
  },
);

export const loginAction = createTypeAsyncAction(
  'LOGIN_ACTION',
  async (args: SHOES_API.LoginParams) => {
    return await ApiService.login(args);
  },
);

export const getProfileAction = createTypeAsyncAction(
  'GET_PROFILE_ACTION',
  async (cookie?: string) => {
    try {
      return await ApiService.getProfile(cookie);
    } catch (err) {
      // ignore err
    }
  },
);

export const initializeApp = createTypeAsyncAction<any, void, Store>(
  'INITIALIZE_APP',
  async (args, { dispatch }) => {
    try {
      await dispatch(listCategoriesAction());
    } catch (err) {
      // ignore err
    }
  },
);

export const initializeCategory = createTypeAsyncAction<any, void, Store>(
  'INITIALIZE_CATEGORY',
  async (args, { dispatch }) => {
    try {
      await dispatch(listColorsAction());
      await dispatch(listSizesAction());
    } catch (err) {
      // ignore err
    }
  },
);

export const initializeAuthPage = createTypeAsyncAction<
  REDUX_STORE.InitializeAuthPageArgs,
  REDUX_STORE.InitializeAuthPagePayload,
  Store
>('INIT_AUTHENICATE_PAGE', async (args, { dispatch }) => {
  const { req } = args;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const isMobile = dispatch(detectMobile(userAgent)).payload;
  const cookie = req.headers.cookie;
  if (!cookie) {
    return {
      isMobile,
    };
  }
  try {
    await dispatch(getProfileAction(cookie));
    return {
      cookie,
      isMobile,
    };
  } catch (err) {
    throw new Error(err);
  }
});

export const logOutAction = createTypeAsyncAction('LOGOUT_ACTION', async () => {
  return await ApiService.logout();
});

export const updateUserInfoAction = createTypeAsyncAction<SHOES_API.UpdateInfoParams, void, Store>(
  'UPDATE_USER_INFO_ACTION',
  async (args, { dispatch }) => {
    try {
      await ApiService.updateUserInfo(args);
      await dispatch(getProfileAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updatePasswordAction = createTypeAsyncAction<
  SHOES_API.UpdatePasswordParams,
  void,
  Store
>('UPDATE_USER_INFO_ACTION', async (args, { dispatch }) => {
  try {
    await ApiService.updatePassword(args);
    await dispatch(getProfileAction());
  } catch (err) {
    throw new Error(err);
  }
});

export const listCitiesAction = createTypeAsyncAction('LIST_CITIES_ACTION', async () => {
  try {
    return await ApiService.listCities();
  } catch (err) {
    throw new Error(err);
  }
});

export const listDistrictsAction = createTypeAsyncAction(
  'LIST_DISTRICTS_ACTION',
  async (id: number) => {
    try {
      return await ApiService.listDistricts(id);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listWardsAction = createTypeAsyncAction('LIST_WARDS_ACTION', async (id: number) => {
  try {
    return await ApiService.listWards(id);
  } catch (err) {
    throw new Error(err);
  }
});

export const listDeliveryAddressAction = createTypeAsyncAction(
  'LIST_DELIVERY_ADDRESS',
  async () => {
    try {
      return await ApiService.listDeliveryAddress();
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const createDeliveryAddressAction = createTypeAsyncAction<
  SHOES_API.CreateDeliveryAddressParams,
  void,
  Store
>(
  'CREATE_DELIVERY_ADDRESS_ACTION',
  async (args: SHOES_API.CreateDeliveryAddressParams, { dispatch }) => {
    try {
      await ApiService.createDeliveryAddress(args);
      await dispatch(listDeliveryAddressAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const setDefaultDeliveryAddressAction = createTypeAsyncAction<number, void, Store>(
  'SET_DEFAULT_DELIVERY_ADDRESS_ACTION',
  async (id: number, { dispatch }) => {
    try {
      await ApiService.setDefaultDeliveryAddress(id);
      await dispatch(listDeliveryAddressAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const deleteDeliveryAddressAction = createTypeAsyncAction<number, void, Store>(
  'DELETE_DELIVERY_ADDRESS_ACTION',
  async (id: number, { dispatch }) => {
    try {
      await ApiService.deleteDeliveryAddress(id);
      await dispatch(listDeliveryAddressAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateDeliveryAddressAction = createTypeAsyncAction<
  SHOES_API.UpdateDeliveryAddressArgs,
  void,
  Store
>(
  'UPDATE_DELIVERY_ADDRESS_ACTION',
  async (args: SHOES_API.UpdateDeliveryAddressArgs, { dispatch }) => {
    try {
      await ApiService.updateDeliveryAddress(args);
      await dispatch(listDeliveryAddressAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const updateAvatarAction = createTypeAsyncAction<FormData, void, Store>(
  'UPDATE_AVATAR_ACTION',
  async (args: FormData, { dispatch }) => {
    try {
      await ApiService.updateAvatar(args);
      await dispatch(getProfileAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listProductSpecialsAction = createTypeAsyncAction(
  'LIST_PRODUCTS_SPECIAL_ACTION',
  async (page?: number) => {
    return await ApiService.listProducts({
      page,
      filters: { isSpecial: true },
    });
  },
);

export const listProductSellWellsAction = createTypeAsyncAction(
  'LIST_PRODUCTS_SELL_WELL_ACTION',
  async (page?: number) => {
    return await ApiService.listProducts({
      page,
      filters: { isSellWell: true },
    });
  },
);

export const listProductCategoryAction = createTypeAsyncAction(
  'LIST_PRODUCTS_CATEGORY_ACTION',
  async (args: {
    page: number;
    filters?: SHOES_API.SearchOptions;
    sorts?: SHOES_API.SortOptions;
  }) => {
    return await ApiService.listProducts(args);
  },
);

export const getProductAction = createTypeAsyncAction(
  'GET_PRODUCT_ACTION',
  async (code: string) => {
    return await ApiService.product(code);
  },
);

export const listColorsAction = createTypeAsyncAction('LIST_COLORS_ACTION', async () => {
  return await ApiService.listColors();
});

export const listSizesAction = createTypeAsyncAction('LIST_SIZES_ACTION', async () => {
  return await ApiService.listsizes();
});

export const listCategoriesAction = createTypeAsyncAction('LIST_CATEGORY_ACTION', async () => {
  return await ApiService.listCategories();
});

export const getCategoryAction = createTypeAsyncAction(
  'GET_CATEGORY_ACTION',
  async (slug: string) => {
    try {
      const response = await ApiService.getCategory(slug);
      return response.data;
    } catch (err) {
      // ignore err
    }
  },
);
