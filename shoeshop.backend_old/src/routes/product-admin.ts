import { Router, Express, Response, NextFunction } from 'express';
import multer from 'multer';
import { ProductServices } from '../services/admin';
import { APIRequest } from '../interfaces';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/products');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage });

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

//----------------------------------------- PRODUCTS-----------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------

router.post('/create', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    await ProductServices.createProduct(payload);
    return res.json({ status: true, message: '' });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.post(
  '/thumbnail/update/:id',
  upload.single('thumbnail'),
  async (req: APIRequest, res: Response, next: NextFunction) => {
    try {
      const payload = req.params.id;
      const { file } = req;
      await ProductServices.updateThumbnail(file.filename, parseInt(payload));
      return res.json({ status: true, message: '' });
    } catch (err) {
      return res.json({ message: String(err), status: false });
    }
  },
);

router.post(
  '/images/update/:id',
  upload.array('images'),
  async (req: APIRequest, res: Response, next: NextFunction) => {
    try {
      const payload = req.params.id;
      const { files } = req;
      const fileNames = [...(files as any)].map((file) => file.filename);
      await ProductServices.insertImages(fileNames, parseInt(payload));
      return res.json({ status: true, message: '' });
    } catch (err) {
      return res.json({ message: String(err), status: false });
    }
  },
);

router.get('/list', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const data = await ProductServices.listProducts();
    return res.json({ data });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});

router.delete('/delete/:id', async (req: APIRequest, res: Response, next: NextFunction) => {
  try {
    const payload = req.params.id;
    await ProductServices.deleteProduct(parseInt(payload));
    return res.json({ status: true, message: '' });
  } catch (err) {
    return res.json({ message: String(err), status: false });
  }
});
