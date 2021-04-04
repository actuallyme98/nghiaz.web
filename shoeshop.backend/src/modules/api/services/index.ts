import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';
import { AddressService } from './delivery-address.service';
import { LocationService } from './location.service';
import { ProductService } from './products.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import { ProductRelatedService } from './product-related.service';
import { BlogService } from './blog.service';

const SERVICES = [
  UserService,
  AuthService,
  MailService,
  AddressService,
  LocationService,
  ProductService,
  CartService,
  OrderService,
  ProductRelatedService,
  BlogService,
];

const EXPORT_SERVICES = [];

export {
  UserService,
  AuthService,
  MailService,
  AddressService,
  LocationService,
  ProductService,
  CartService,
  OrderService,
  ProductRelatedService,
  BlogService,
  SERVICES,
  EXPORT_SERVICES,
};
