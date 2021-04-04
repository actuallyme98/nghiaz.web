import { UserController } from './users.controller';
import { AuthController } from './auth.controller';
import { StaticController } from './static.controller';
import { AddressController } from './delivery-address.controller';
import { LocationController } from './location.controller';
import { ProductsController } from './products.controller';
import { CartController } from './cart.controller';
import { OrderController } from './order.controller';
import { ProductRelatedController } from './product-related.controller';
import { BlogController } from './blog.controller';

const CONTROLLERS = [
  UserController,
  AuthController,
  StaticController,
  AddressController,
  LocationController,
  ProductsController,
  CartController,
  OrderController,
  ProductRelatedController,
  BlogController,
];

export {
  UserController,
  AuthController,
  StaticController,
  AddressController,
  LocationController,
  ProductsController,
  CartController,
  OrderController,
  ProductRelatedController,
  BlogController,
  CONTROLLERS,
};
