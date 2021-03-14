import { Mssql } from '../../base';
import { ProductColor, ProductSize } from '../../models';

import { UpdateColorArgs, UpdateSizeArgs } from '../../dtos';

export class ProductService {
  public async listSizes() {
    try {
      return await Mssql.FindAll('size');
    } catch (err) {
      throw new Error(err);
    }
  }
  public async getSize(size: number) {
    try {
      return await Mssql.Find('size', 'name', size);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async createSize(args: ProductSize) {
    try {
      const size = await this.getSize(args.name);
      if (size) {
        throw new Error('Size already exist');
      }
      return await Mssql.Insert('size', args);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async updateSize(args: UpdateSizeArgs) {
    try {
      const argsUpdated = [{ col: 'name', value: args.name }];
      await Mssql.Update('size', { col: 'id', value: args.id }, argsUpdated);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async deleteSize(id: number) {
    try {
      return await Mssql.Delete('size', 'id', id);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async listColors() {
    try {
      return await Mssql.FindAll('color');
    } catch (err) {
      throw new Error(err);
    }
  }
  public async getColor(name: string) {
    try {
      return await Mssql.Find('color', 'name', name);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async createColor(args: ProductColor) {
    try {
      const color = await this.getColor(args.name);
      if (!!color) {
        throw new Error('Color already exist');
      }
      return await Mssql.Insert('color', args);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async updateColor(args: UpdateColorArgs) {
    try {
      const argsUpdated = [
        { col: 'name', value: args.name },
        { col: 'code', value: args.code },
      ];
      await Mssql.Update('color', { col: 'id', value: args.id }, argsUpdated);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async deleteColor(id: number) {
    try {
      return await Mssql.Delete('color', 'id', id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ProductService();
