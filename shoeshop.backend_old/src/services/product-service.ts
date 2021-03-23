import { Mssql } from '../base';

import { StringHelper } from '../helpers';

import { ListProductArgs } from '../dtos';

export class ProductServices {
  public async listProducts(args: ListProductArgs) {
    try {
      const datas = await Mssql.listProducts(args);
      return Promise.all(datas.map(async (data) => StringHelper.deepTrim(data)));
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ProductServices();
