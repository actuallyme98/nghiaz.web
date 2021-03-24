import { UserController } from './users.controller';
import { AuthController } from './auth.controller';
import { StaticController } from './static.controller';
import { AddressController } from './delivery-address.controller';

const CONTROLLERS = [UserController, AuthController, StaticController, AddressController];

export { UserController, AuthController, StaticController, AddressController, CONTROLLERS };
