import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { ProductCSC } from './product-csc.service';
import { ProductService } from './product.service';
import { VoucherService } from './voucher.service';
import { OrderService } from './order.service';
import { BlogService } from './blog.service';
import { UserService } from './users.service';

const SERVICES_ADMIN = [
  AdminService,
  AuthService,
  ProductCSC,
  ProductService,
  VoucherService,
  OrderService,
  BlogService,
  UserService,
];

export {
  AdminService,
  AuthService,
  ProductCSC,
  ProductService,
  VoucherService,
  OrderService,
  BlogService,
  UserService,
  SERVICES_ADMIN,
};
