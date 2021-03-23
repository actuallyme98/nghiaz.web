import { Router, Express, Response, NextFunction } from 'express';
import { CityService } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/products', router);
};

router.get('/list', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const data = await CityService.listCities();
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
