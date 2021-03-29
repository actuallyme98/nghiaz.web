declare namespace REDUX_STORE {
  interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
    client: Client;
  }

  interface Client {
    id: number;
    avatar?: string;
    dob?: string;
    gender: EnumGender;
    clone: number;
  }

  enum EnumGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNDEFINED = 'UNDEFINED',
  }

  interface InitializeAuthPageArgs {
    req: any;
  }

  interface InitializeAuthPagePayload {
    isMobile: boolean;
    cookie?: string;
  }

  interface ProductImage {
    id: number;
    url: string;
  }

  interface Size {
    id: number;
    name: number;
  }

  interface Color {
    id: number;
    name: string;
    code: string;
  }

  interface Product {
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
    categories: ICategory[];
  }

  interface ICategory {
    id: number;
    name: string;
    pk: number;
    thumbnail?: string;
    slug: string;
  }

  interface CartItem {
    id: number;
    product: Product;
    amount: number;
    createdAt: Date;
    updateAt: Date;
  }

  interface VoucherCode {
    id: number;
    code: string;
    isUsed: number;
    voucher: IVoucher;
  }

  type VoucherType = 'discount_price' | 'discount_percentage' | 'free_ship';

  interface IVoucher {
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
  }

  interface ICartLine {
    id: number;
    client: Client;
    cartItems: CartItem[];
    voucherCode?: VoucherCode;
  }

  interface ICarrier {
    id: number;
    name: string;
    method: string;
    fee: number;
    description: string;
  }

  interface City {
    id: number;
    code: number;
    name: string;
    isActive: number;
  }

  interface District {
    id: number;
    cityId: number;
    code: number;
    name: string;
    isActive: number;
  }

  interface Ward {
    id: number;
    districtID: number;
    code: number;
    name: string;
    isActive: number;
  }

  interface OrderItem {
    id: number;
    amount: number;
    product: Product;
  }

  interface IOrder {
    id: number;
    code: string;
    status: OrderStatusEnums;
    reason: string;
    description: string;
    price: number;
    discountPrice: number;
    paymentMethod: string;
    name: string;
    phone: string;
    address: string;
    city: City;
    district: District;
    ward: Ward;
    client: Client;
    carrier: ICarrier;
    orderItems: OrderItem[];
    createdAt: string;
    updatedAt: string;
  }
}
