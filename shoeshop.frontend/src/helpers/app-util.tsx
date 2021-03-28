import moment from 'moment';

export const caculateDiscount = (code: any, price: number, shipFree?: number) => {
  if (!code) {
    return 0;
  }
  const total = price + (shipFree || 0);
  switch (code.discountType) {
    case 'discount_price':
      return Math.min(code.amount || 0, total);
    case 'discount_percentage':
      return Math.min(
        Math.floor(Math.min(code.maxAmount || 0, (code.percent || 0) * 0.01 * total)),
        total,
      );
    case 'free_ship':
      return Math.min(shipFree || 0, code.maxAmount || 0);
    default:
      return 0;
  }
};

export const pathAvatar = (path?: string) => {
  if (!path?.trim()) {
    return process.env.DEFAULT_AVATAR_URL || '';
  }
  return process.env.SERVER_URL + 'upload/assets/' + path;
};

export const toDateTime = (date?: string) => {
  if (!date) {
    return '';
  }
  return moment(date).format('YYYY-MM-DD HH:mm');
};
