import { Product } from '../models';

import { ProductServices } from '../services/admin';

import { StringHelper } from '../helpers';

interface GImage {
  id: number;
  url: string;
  alt: string;
}

interface GProduct extends Product {
  images: GImage[];
}

export const toGImage = (args: any): GImage => {
  const data = {
    id: args.id,
    url: args.url,
    alt: args.alt,
  };
  return StringHelper.deepTrim(data);
};

export const toGProduct = async (args: any): Promise<GProduct> => {
  const images = await ProductServices.listImageByProduct(args.id);
  const imagesMap = images.map((image: any) => toGImage(image));

  const data = {
    id: args.id,
    code: args.code,
    name: args.name,
    price: args.price,
    status: args.status,
    slug: args.slug,
    discountPrice: args.discount_price,
    currentPrice: args.current_price,
    isSellWell: args.is_sell_well === 1,
    isSpecial: args.is_special === 1,
    thumbnail: args.thumbnail,
    shortDescription: args.short_description,
    description: args.description,
    bodyDetail: args.body_detail,
    soldeDetail: args.sole_detail,
    priority: args.priority,
    quantity: args.quantity,
    vat: args.vat,
    images: imagesMap,
  };

  return StringHelper.deepTrim(data);
};
