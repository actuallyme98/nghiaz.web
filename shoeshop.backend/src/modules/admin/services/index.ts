import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { ProductCSC } from './product-csc.service';
import { ProductService } from './product.service';
import { VoucherService } from './voucher.service';

const SERVICES_ADMIN = [AdminService, AuthService, ProductCSC, ProductService, VoucherService];

export { AdminService, AuthService, ProductCSC, ProductService, VoucherService, SERVICES_ADMIN };
