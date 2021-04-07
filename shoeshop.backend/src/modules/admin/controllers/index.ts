import { AdminController } from './admin.controller';
import { ProductCSCController } from './product-csc.controller';
import { ProductController } from './product.controller';
import { AuthController } from './auth.controller';
import { VoucherController } from './voucher.controller';
import { OrderController } from './order.controller';
import { BlogController } from './blog.controller';
import { UserController } from './users.controller';

const CONTROLLERS = [
  AdminController,
  ProductCSCController,
  ProductController,
  AuthController,
  VoucherController,
  OrderController,
  BlogController,
  UserController,
];

export {
  AdminController,
  ProductCSCController,
  ProductController,
  AuthController,
  VoucherController,
  OrderController,
  BlogController,
  UserController,
  CONTROLLERS,
};
