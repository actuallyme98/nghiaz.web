import { Router, Express, Response, NextFunction } from 'express';
import { CategoryService } from '../services/admin';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/admin/category', router);
};

router.get('/list', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const data = await CategoryService.listCategories();
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
