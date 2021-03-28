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
  orders: SHOES_API.PaginationResponse<REDUX_STORE.IOrder>;
}

export const initialState: Store = {
  isMobile: false,
  openCartDrawer: false,
  deliveryAddresses: [],
  specialProducts: initialPaging,
  sellWellProducts: initialPaging,
  categoryProducts: initialPaging,
  categories: [],
  sizes: [],
  colors: [],
  carriers: [],
  orders: initialPaging,
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
    orders: initialPaging,
  };
});

export const listDeliveryAddressReducer = AppActions.listDeliveryAddressAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload) {
      return {};
    }
    return {
      deliveryAddresses: action.payload,
    };
  },
);

export const listSpecialProductsReducer = AppActions.listProductSpecialsAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload) {
      return {};
    }
    return {
      specialProducts: action.payload,
    };
  },
);

export const listSellWellProductsReducer = AppActions.listProductSellWellsAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload) {
      return {};
    }
    return {
      sellWellProducts: action.payload,
    };
  },
);

export const listCategoryProductsReducer = AppActions.listProductCategoryAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload) {
      return {};
    }
    return {
      categoryProducts: action.payload,
    };
  },
);

export const listCategoryReducer = AppActions.listCategoriesAction.reducer<Store>(
  (state, action) => {
    if (isError(action) || !action.payload) {
      return {};
    }
    return {
      categories: action.payload,
    };
  },
);

export const listColorsReducer = AppActions.listColorsAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    colors: action.payload,
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

export const getCartLineReducer = AppActions.getCartAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    cartline: action.payload,
  };
});

export const listCarriersReducer = AppActions.listCarriersAction.reducer<Store>((state, action) => {
  if (isError(action) || !action.payload) {
    return {};
  }
  return {
    carriers: action.payload,
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
  listCarriersReducer,
  listOrdersReducer,
);
