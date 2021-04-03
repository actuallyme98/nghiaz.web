export enum ApiRouteEnum {
  LOGIN = '/auth/token',
  GET_PROFILE = '/auth/me',
  LOGOUT = '/auth/logout',
  LIST_SIZES = '/products-csc/size/list',
  UPDATE_SIZE = '/products-csc/size',
  SIZES = '/products-csc/size',
  LIST_COLORS = '/products-csc/color/list',
  UPDATE_COLOR = '/products-csc/color',
  COLORS = '/products-csc/color',
  CREATE_PRODUCT = '/products/create',
  DELETE_PRODUCT = '/products/delete',
  UPDATE_PRODUCT_THUMBNAIL = '/products/thumbnail/update',
  UPDATE_PRODUCT_IMAGES = '/products/images/update',
  LIST_PRODUCTS = '/products/list',
  CATEGORIES_LIST = '/products-csc/category/list',
  CATEGORIES = '/products-csc/category',
  CATEGORIES_THUMBNAIL = '/products-csc/category/thumbnail',
  LIST_VOUCHER = '/voucher/list',
  CREATE_VOUCHER = '/voucher/create',
  UPDATE_VOUCHER = '/voucher/update',
  DELETE_VOUCHER = '/voucher/delete',
  UPDATE_VOUCHER_CODE = '/voucher/code/update',
  DELETE_VOUCHER_CODE = '/voucher/code/delete',
  LIST_ORDER = '/order/list',
  UPDATE_ORDER = '/order/update-status',
  DELETE_ORDER = '/order/delete',
}
