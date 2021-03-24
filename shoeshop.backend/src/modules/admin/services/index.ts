import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { ProductCSC } from './product-csc.service';
import { ProductService } from './product.service';

const SERVICES_ADMIN = [AdminService, AuthService, ProductCSC, ProductService];

export { AdminService, AuthService, ProductCSC, ProductService, SERVICES_ADMIN };
