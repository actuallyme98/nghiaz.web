import moment from 'moment';

export const caculateDiscount = (price: number, code?: REDUX_STORE.IVoucher, shipFree?: number) => {
  if (!code) {
    return 0;
  }
  switch (code.type.trim()) {
    case 'discount_price':
      return Math.min(code.amount || 0, price);
    case 'discount_percentage':
      return Math.min(
        Math.floor(Math.min(code.maxAmount || 0, (code.percentDiscount || 0) * 0.01 * price)),
        price,
      );
    case 'free_ship':
      return Math.min(shipFree || 0, code.maxAmount || 0);
    default:
      return 0;
  }
};

export const pathUrl = (path?: string) => {
  if (!path?.trim()) {
    return process.env.DEFAULT_AVATAR_URL || '';
  }
  return process.env.SERVER_URL + 'static/' + path;
};

export const toDateTime = (date?: string) => {
  if (!date) {
    return '';
  }
  return moment(date).format('YYYY-MM-DD HH:mm');
};
