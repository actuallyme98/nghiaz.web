import { Mssql } from '../../base';
import { ProductColor, ProductSize } from '../../models';
import moment from 'moment';

import { StringHelper } from '../../helpers';

import { UpdateColorArgs, UpdateSizeArgs, CreateProductArgs } from '../../dtos';
import { toGProduct } from '../../transforms/product.transform';

export class ProductService {
  public async listSizes() {
    const datas = await Mssql.FindAll('size');
    return datas.map((data) => StringHelper.deepTrim(data));
  }
  public async getSize(size: number) {
    return await Mssql.Find('size', 'name', size);
  }
  public async createSize(args: ProductSize) {
    const size = await this.getSize(args.name);
    if (size) {
      throw new Error('Size already exist');
    }
    return await Mssql.Insert('size', args);
  }
  public async updateSize(args: UpdateSizeArgs) {
    const argsUpdated = [{ col: 'name', value: args.name }];
    await Mssql.Update('size', { col: 'id', value: args.id }, argsUpdated);
  }
  public async deleteSize(id: number) {
    return await Mssql.Delete('size', 'id', id);
  }
  public async listColors() {
    const datas = await Mssql.FindAll('color');
    return datas.map((data) => StringHelper.deepTrim(data));
  }
  public async getColor(name: string) {
    return await Mssql.Find('color', 'name', name);
  }
  public async createColor(args: ProductColor) {
    const color = await this.getColor(args.name);
    if (!!color) {
      throw new Error('Color already exist');
    }
    return await Mssql.Insert('color', args);
  }
  public async updateColor(args: UpdateColorArgs) {
    const argsUpdated = [
      { col: 'name', value: args.name },
      { col: 'code', value: args.code },
    ];
    await Mssql.Update('color', { col: 'id', value: args.id }, argsUpdated);
  }
  public async deleteColor(id: number) {
    return await Mssql.Delete('color', 'id', id);
  }
  //----------------------------------------- PRODUCTS-----------------------------------------------------
  //-------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------
  public async listImageByProduct(id: number) {
    return await Mssql.FindAllBy('product_image', 'product_id', id);
  }
  public async triggerInsertPrCl(productId: number, colorIds: number[]) {
    for (const color of colorIds) {
      try {
        await Mssql.Insert('product_color', { productId, color });
      } catch (err) {
        continue;
      }
    }
  }
  public async triggerInsertPrSz(productId: number, sizeIds: number[]) {
    for (const size of sizeIds) {
      try {
        await Mssql.Insert('product_size', { productId, size });
      } catch (err) {
        continue;
      }
    }
  }
  public async triggerInsertPrCg(productId: number, categIds: number[]) {
    for (const categ of categIds) {
      try {
        await Mssql.Insert('product_category', { productId, categ });
      } catch (err) {
        continue;
      }
    }
  }
  public async triggerInsertPrTag(productId: number, tagIds: number[]) {
    for (const tag of tagIds) {
      try {
        await Mssql.Insert('product_tag', { productId, tag });
      } catch (err) {
        continue;
      }
    }
  }

  public async createProduct(args: CreateProductArgs) {
    try {
      const data = await Mssql.Find('product', 'slug', args.slug);
      if (data) {
        throw new Error('Sản phẩm đã tồn tại');
      }
    } catch (err) {
      throw new Error(err);
    }
    const {
      id,
      name,
      price,
      status,
      slug,
      discountPrice,
      currentPrice,
      isSellWell,
      isSpecial,
      priority,
      quantity,
      vat,
      bodyDetail,
      description,
      shortDescription,
      soleDetail,
      thumbnail,
      categoryIds,
      colorIds,
      sizeIds,
    } = args;
    const createArgs = {
      code: StringHelper.randomString(6),
      name,
      price,
      status,
      slug,
      discountPrice,
      currentPrice,
      isSpecial,
      isSellWell,
      thumbnail,
      shortDescription,
      description,
      bodyDetail,
      soleDetail,
      priority,
      quantity,
      vat,
      createdAt: moment().format('YYYY-MM-DD HH:mm'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm'),
    };
    try {
      await Mssql.Insert('product', createArgs, id);
      console.log('--------Running trigger---------------------');
      await this.triggerInsertPrCl(id, colorIds);
      await this.triggerInsertPrSz(id, sizeIds);
      await this.triggerInsertPrCg(id, categoryIds);
      console.log('--------Insert product successfully---------');
    } catch (err) {
      throw new Error(err);
    }
  }
  public async updateThumbnail(path: string, id: number) {
    const argsUpdated = [{ col: 'thumbnail', value: path }];
    await Mssql.Update('product', { col: 'id', value: id }, argsUpdated);
  }
  public async insertImages(paths: string[], id: number) {
    for (const url of paths) {
      try {
        const createArgs = {
          productId: id,
          url,
        };
        await Mssql.Insert('product_image', createArgs);
      } catch (err) {
        continue;
      }
    }
  }
  public async listProducts() {
    try {
      const datas = await Mssql.FindAll('product');
      return Promise.all(datas.map(async (data) => await toGProduct(data)));
    } catch (err) {
      throw new Error();
    }
  }
  public async triggerDeletePr(id: number, table: string) {
    try {
      return await Mssql.Delete(table, 'product_id', id);
    } catch (err) {
      throw new Error();
    }
  }
  public async deleteProduct(id: number) {
    try {
      await Mssql.Delete('product', 'id', id);
      await this.triggerDeletePr(id, 'product_image');
      await this.triggerDeletePr(id, 'product_color');
      await this.triggerDeletePr(id, 'product_size');
      await this.triggerDeletePr(id, 'product_category');
    } catch (err) {
      throw new Error();
    }
  }
}

export default new ProductService();
