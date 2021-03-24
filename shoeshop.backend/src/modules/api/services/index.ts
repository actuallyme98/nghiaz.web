import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';
import { AddressService } from './delivery-address.service';
import { LocationService } from './location.service';
const SERVICES = [UserService, AuthService, MailService, AddressService, LocationService];

const EXPORT_SERVICES = [];

export {
  UserService,
  AuthService,
  MailService,
  AddressService,
  LocationService,
  SERVICES,
  EXPORT_SERVICES,
};
