import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AdminController } from '@admin/controllers/admin.controller';
import { SERVICES_ADMIN } from '@admin/services';
import { ENTITIES } from '@api/entities';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@admin/passport/local.strategy';
import { SessionSerializer } from '@admin/passport/session.serializer';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature(ENTITIES),
    HttpModule,
  ],
  controllers: [AdminController],
  providers: [...SERVICES_ADMIN, LocalStrategy, SessionSerializer],
})
export class AdminModule {}
