import { Mssql } from '../../base';
import { ProductColor, ProductSize } from '../../models';

import { StringHelper } from '../../helpers';

import { UpdateColorArgs, UpdateSizeArgs } from '../../dtos';

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
}

export default new ProductService();
