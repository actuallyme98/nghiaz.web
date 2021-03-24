import { AdminController } from './admin.controller';
import { ProductCSCController } from './product-csc.controller';
import { ProductController } from './product.controller';
import { AuthController } from './auth.controller';

const CONTROLLERS = [AdminController, ProductCSCController, ProductController, AuthController];

export { AdminController, ProductCSCController, ProductController, AuthController, CONTROLLERS };
