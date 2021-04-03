import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export const initialPaging = {
  items: [],
  meta: {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
};

export interface Store {
  profile?: REDUX_STORE.Profile;
  sizes: REDUX_STORE.ProductSize[];
  colors: REDUX_STORE.ProductColor[];
  products: REDUX_STORE.IProduct[];
  categories: REDUX_STORE.ICategory[];
  vouchers: REDUX_STORE.Voucher[];
  orders: ADMIN_API.PaginationResponse<REDUX_STORE.Order>;
}

export const initialState: Store = {
  sizes: [],
  colors: [],
  products: [],
  categories: [],
  vouchers: [],
  orders: initialPaging,
};

export const loginReducer = AppActions.loginAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: action.payload.user,
  };
});

export const getProfile = AppActions.getProfileAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: action.payload,
  };
});

export const logoutReducer = AppActions.logOutAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    profile: undefined,
    sizes: [],
    colors: [],
    products: [],
    categories: [],
  };
});

export const listSizesReducer = AppActions.listSizesAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    sizes: action.payload,
  };
});

export const listColorsReducer = AppActions.listColorsAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    colors: action.payload,
  };
});

export const listCategoriesReducer = AppActions.listCategoriesAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload) {
      return {};
    }
    return {
      categories: action.payload,
    };
  },
);

export const listProductsReducer = AppActions.listProductsAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    products: action.payload,
  };
});

export const listVouchersReducer = AppActions.listVoucherAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    vouchers: action.payload,
  };
});

export const listOrdersReducer = AppActions.listOrdersAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    orders: action.payload,
  };
});

export const reducer = createTypeReducer(
  initialState,
  loginReducer,
  getProfile,
  logoutReducer,
  listSizesReducer,
  listColorsReducer,
  listCategoriesReducer,
  listProductsReducer,
  listVouchersReducer,
  listOrdersReducer,
);
