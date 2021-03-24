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
    categories: Category[];
  }
}
