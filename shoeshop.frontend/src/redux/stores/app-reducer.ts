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
}

export const initialState: Store = {
  isMobile: false,
  openCartDrawer: false,
  deliveryAddresses: [],
  specialProducts: initialProduct,
  sellWellProducts: initialProduct,
  categoryProducts: initialProduct,
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
);
