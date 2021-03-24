import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';
import { AddressService } from './delivery-address.service';
import { LocationService } from './location.service';
import { ProductService } from './products.service';

const SERVICES = [
  UserService,
  AuthService,
  MailService,
  AddressService,
  LocationService,
  ProductService,
];

const EXPORT_SERVICES = [];

export {
  UserService,
  AuthService,
  MailService,
  AddressService,
  LocationService,
  ProductService,
  SERVICES,
  EXPORT_SERVICES,
};
