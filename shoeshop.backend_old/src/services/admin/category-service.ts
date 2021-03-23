import { Mssql } from '../../base';
import { Category } from '../../models';

import { StringHelper } from '../../helpers';

export class CategoryService {
  public async listCategories() {
    const datas = await Mssql.FindAll('category');
    return datas.map((data) => StringHelper.deepTrim(data));
  }
  public async createCategory(args: Category) {
    const createArgs: Category = {
      name: args.name,
      image: args.image,
      slug: args.slug,
    };
    return await Mssql.Insert('category', createArgs);
  }
}

export default new CategoryService();
