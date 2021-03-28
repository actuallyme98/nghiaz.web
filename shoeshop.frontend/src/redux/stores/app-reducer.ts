import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export const initialProduct = {
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
  isMobile: boolean;
  openCartDrawer: boolean;
  initializeAuthPage?: boolean;
  profile?: REDUX_STORE.Profile;
  deliveryAddresses: SHOES_API.GDeliveryAddress[];
  specialProducts: SHOES_API.PaginationResponse<REDUX_STORE.Product>;
  sellWellProducts: SHOES_API.PaginationResponse<REDUX_STORE.Product>;
  categoryProducts: SHOES_API.PaginationResponse<REDUX_STORE.Product>;
  categories: REDUX_STORE.ICategory[];
  sizes: REDUX_STORE.Size[];
  colors: REDUX_STORE.Color[];
  cartline?: REDUX_STORE.ICartLine;
  carriers: REDUX_STORE.ICarrier[];
}

export const initialState: Store = {
  isMobile: false,
  openCartDrawer: false,
  deliveryAddresses: [],
  specialProducts: initialProduct,
  sellWellProducts: initialProduct,
  categoryProducts: initialProduct,
  categories: [],
  sizes: [],
  colors: [],
  carriers: [],
};

export const detectMobileReducer = AppActions.detectMobile.reducer<Store>((state, action) => ({
  isMobile: action.payload,
}));

export const openCartDrawer = AppActions.openCartDrawer.reducer<Store>((state, action) => ({
  openCartDrawer: action.payload,
}));

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
    deliveryAddresses: [],
  };
});

export const listDeliveryAddressReducer = AppActions.listDeliveryAddressAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload.data) {
      return {};
    }
    return {
      deliveryAddresses: action.payload.data,
    };
  },
);

export const listSpecialProductsReducer = AppActions.listProductSpecialsAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload.data) {
      return {};
    }
    return {
      specialProducts: action.payload.data,
    };
  },
);

export const listSellWellProductsReducer = AppActions.listProductSellWellsAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload.data) {
      return {};
    }
    return {
      sellWellProducts: action.payload.data,
    };
  },
);

export const listCategoryProductsReducer = AppActions.listProductCategoryAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload.data) {
      return {};
    }
    return {
      categoryProducts: action.payload.data,
    };
  },
);

export const listCategoryReducer = AppActions.listCategoriesAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload.data) {
      return {};
    }
    return {
      categories: action.payload.data,
    };
  },
);

export const listColorsReducer = AppActions.listColorsAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload.data) {
    return {};
  }
  return {
    colors: action.payload.data,
  };
});

export const listSizesReducer = AppActions.listSizesAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload.data) {
    return {};
  }
  return {
    sizes: action.payload.data,
  };
});

export const getCartLineReducer = AppActions.getCartAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    cartline: action.payload,
  };
});

export const reducer = createTypeReducer(
  initialState,
  detectMobileReducer,
  openCartDrawer,
  loginReducer,
  getProfile,
  logoutReducer,
  listDeliveryAddressReducer,
  listSpecialProductsReducer,
  listSellWellProductsReducer,
  listCategoryProductsReducer,
  listCategoryReducer,
  listColorsReducer,
  listSizesReducer,
  getCartLineReducer,
);
