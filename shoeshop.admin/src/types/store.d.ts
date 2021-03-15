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
    id?: string;
    code?: string;
    name: string;
    price: number;
    vat: number;
    status: boolean;
    slug?: string;
    discountPrice?: number;
    currentPrice?: number;
    isSellWell: boolean;
    isSpecial: boolean;
    priority: number;
    weight: number;
    thumbnail?: string;
    shortDescription?: string;
    description?: string;
    originId?: number;
    materialId?: number;
    sizeId?: string;
    colorId?: string;
    bodyDetail?: string;
    soleDetail?: string;
    quantity: number;
  }

  interface ICategory {
    id?: number;
    name: string;
    image?: string;
    slug?: string;
  }
}
