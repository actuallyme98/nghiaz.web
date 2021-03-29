declare namespace REDUX_STORE {
  interface Profile {}
  interface ProductSize {
    id: number;
    name: number;
  }

  interface ProductColor {
    id: number;
    name: string;
    code: string;
  }

  interface IProduct {
    id: number;
    code: string;
    name: string;
    price: number;
    discountPrice: number;
    currentPrice: number;
    isSpecial: number;
    isSellWell: number;
    status: number;
    thumbnail: string;
    slug: string;
    shortDescription: string;
    description: string;
    bodyDetail: string;
    soleDetail: string;
    priority: number;
    quantity: number;
    vat: number;
    images: ProductImage[];
    videos: ProductVideo[];
    sizes: Size[];
    colors: Color[];
    categories: Category[];
  }

  interface ICategory {
    id: number;
    pk: number;
    name: string;
    image?: string;
    slug: string;
  }

  type VoucherType = 'discount_price' | 'discount_percentage' | 'free_ship';

  interface Voucher {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    type: VoucherType;
    percentDiscount: number;
    amount: number;
    maxAmount: number;
    quantity: number;
    requireMinPrice: number;
    voucherCodes: VoucherCode[];
  }

  interface VoucherCode {
    id: number;
    code: string;
    isUsed: number;
  }
}
