import { AdminController } from './admin.controller';
import { ProductCSCController } from './product-csc.controller';
import { ProductController } from './product.controller';
import { AuthController } from './auth.controller';
import { VoucherController } from './voucher.controller';

const CONTROLLERS = [
  AdminController,
  ProductCSCController,
  ProductController,
  AuthController,
  VoucherController,
];

export {
  AdminController,
  ProductCSCController,
  ProductController,
  AuthController,
  VoucherController,
  CONTROLLERS,
};
