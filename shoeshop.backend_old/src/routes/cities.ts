import { Router, Express, Response, NextFunction } from 'express';
import { CityService } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/cities', router);
};

router.get('/list', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const data = await CityService.listCities();
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.get('/district/:cityId', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = parseInt(req.params.cityId || '0');
  try {
    const data = await CityService.findDistrictByCityCode(payload);
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.get('/ward/:districtId', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = parseInt(req.params.districtId || '0');
  try {
    const data = await CityService.findWardByDistrictCode(payload);
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
