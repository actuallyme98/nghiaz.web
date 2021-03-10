import { Router, Express, Response } from 'express';
import { UserService, authMiddleware } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/user', router);
};

router.post('/register', async (req: APIRequest, res: Response) => {
  const payload = req.body;
  const result = await UserService.createUser(payload);
  return res.json({ ...result });
});

router.post('/update-info', authMiddleware, async (req: APIRequest, res: Response) => {
  const payload = req.body;
  const { user } = req;
  try {
    await UserService.updateInfo({
      ...payload,
      userId: user?.id,
    });
    return res.json({ status: true });
  } catch (err) {
    return res.json({ status: false, message: String(err) });
  }
});

router.post('/update-password', authMiddleware, async (req: APIRequest, res: Response) => {
  const payload = req.body;
  const { user } = req;
  try {
    await UserService.updatePassword({
      ...payload,
      userId: user?.id,
    });
    return res.json({ status: true });
  } catch (err) {
    return res.json({ status: false, message: String(err) });
  }
});
