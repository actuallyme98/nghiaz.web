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
