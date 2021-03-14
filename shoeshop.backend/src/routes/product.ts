import { Router, Express, Response, NextFunction } from 'express';
import { authMiddleware, ProductServices } from '../services/admin';
import { AuthService } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/admin/products', router);
};

router.get('/size/list', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const data = await ProductServices.listSizes();
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/size', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const data = await ProductServices.createSize(payload);
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/size/update', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const data = await ProductServices.updateSize(payload);
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.delete('/size/:id', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.params.id;
  try {
    const data = await ProductServices.deleteSize(parseInt(payload));
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.get('/color/list', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const data = await ProductServices.listColors();
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/color', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const data = await ProductServices.createColor(payload);
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post('/color/update', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const data = await ProductServices.updateColor(payload);
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.delete('/color/:id', async (req: APIRequest, res: Response, next: NextFunction) => {
  const payload = req.params.id;
  try {
    const data = await ProductServices.deleteColor(parseInt(payload));
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
