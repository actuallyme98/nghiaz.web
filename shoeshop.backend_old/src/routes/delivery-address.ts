import { Router, Express, Response, NextFunction } from 'express';
import { DeliveryAddressService, authMiddleware } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/delivery-address', router);
};

router.post('/', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    await DeliveryAddressService.createDeliveryAddress(payload);
    return res.json({ message: '', status: true });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.get('/list', authMiddleware, async (req: APIRequest, res: Response, next: NextFunction) => {
  const { user } = req;
  if (!user) {
    return res.json({ message: 'Unauthorized', status: false });
  }

  try {
    const data = await DeliveryAddressService.findAddressByClientId(user.client?.id);
    return res.json({ data: data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/set-default/:id', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = parseInt(req.params.id || '0');
  try {
    await DeliveryAddressService.setDeliveryAddressDefault(payload);
    return res.json({ message: '', status: true });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/delete/:id', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = parseInt(req.params.id || '0');
  try {
    await DeliveryAddressService.deleteDeliveryAddress(payload);
    return res.json({ message: '', status: true });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/update', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    await DeliveryAddressService.updateDeliveryAddress(payload);
    return res.json({ message: '', status: true });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
