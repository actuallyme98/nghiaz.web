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
      await dispatch(listProductsAction());
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const listSizesAction = createTypeAsyncAction('LIST_SIZES_ACTION', async () => {
  try {
    return await ApiService.listSizes();
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
    return await ApiService.listColors();
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
    return await ApiService.listCategories();
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

export const listProductsAction = createTypeAsyncAction('LIST_PRODUCTS_ACTION', async () => {
  try {
    return await ApiService.listProducts();
  } catch (err) {
    throw new Error(err);
  }
});

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
