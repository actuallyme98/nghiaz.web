import { UserController } from './users.controller';
import { AuthController } from './auth.controller';
import { StaticController } from './static.controller';
import { AddressController } from './delivery-address.controller';
import { LocationController } from './location.controller';
import { ProductsController } from './products.controller';

const CONTROLLERS = [
  UserController,
  AuthController,
  StaticController,
  AddressController,
  LocationController,
  ProductsController,
];

export {
  UserController,
  AuthController,
  StaticController,
  AddressController,
  LocationController,
  ProductsController,
  CONTROLLERS,
};
