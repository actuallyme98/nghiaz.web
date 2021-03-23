import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';

const SERVICES = [UserService, AuthService, MailService];

const EXPORT_SERVICES = [];

export { UserService, AuthService, MailService, SERVICES, EXPORT_SERVICES };
