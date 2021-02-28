import { Router, Express } from 'express';

const router = Router();

module.exports = (app: Express) => {
  app.use('/', router);
};

router.get('/', async (req, res, next) => {
  res.json({ message: 'get successfully' });
});
