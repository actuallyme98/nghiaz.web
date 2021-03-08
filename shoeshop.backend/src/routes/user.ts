import { Router, Express, Request, Response } from 'express';
import { UserService } from '../services';

const router = Router();

module.exports = (app: Express) => {
  app.use('/api/user', router);
};

router.post('/register', async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createUser(payload);
  return res.json({ ...result });
});

router.post(
  '/update-info',
  async (req: Request, res: Response) => {
    const payload = req.body;
    try {
      await UserService.updateInfo(payload);
      return res.json({ status: true });
    } catch (err) {
      res.json({ status: false, message: String(err) });
    }
  },
  [],
);
