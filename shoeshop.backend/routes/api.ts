import { Router, Express } from 'express';

const router = Router();

module.exports = (app: Express) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.json({ message: `get ${router.route.name}` });
});
