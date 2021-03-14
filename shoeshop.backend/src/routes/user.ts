import { Router, Express, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import { UserService, authMiddleware, ClientService } from '../services';
import { APIRequest } from '../interfaces';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/avatars')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage });

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

router.post('/update-avatar', authMiddleware, upload.single('avatar'), async (req: APIRequest, res: Response) => {
  const { file, user } = req;
  if(!user) {
    return res.json({ status: false, message: 'Unauthorized' });
  }
  if (!file) {
    return res.json({ status: false, message: 'Please select file' });
  }
  try {
    await ClientService.updateAvatar(file.filename, user.client?.id);
    return res.json({ status: true, message: '' });
  } catch(err) {
    return res.json({ status: false, message: String(err) });
  }
});

router.get('/data/:fileName', async (req: APIRequest, res: Response) => {
  const payload = req.params.fileName;
  if (!payload) {
    return res.json({ status: false, message: 'Unauthorized' });
  }
  const img = fs.readFileSync('public/avatars/' + payload);

  res.contentType('image/jpeg');
  res.send(img);
})
