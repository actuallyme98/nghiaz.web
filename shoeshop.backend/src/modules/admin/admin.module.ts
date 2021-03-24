import { Module, HttpModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { CONTROLLERS } from '@admin/controllers';
import { SERVICES_ADMIN } from '@admin/services';
import { ENTITIES } from '@api/entities';
import { PassportModule } from '@nestjs/passport';
import { AuthMiddleware } from '@admin/middlewares';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature(ENTITIES),
    HttpModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload/assets',
      }),
    }),
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES_ADMIN],
})
export class AdminModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'admin/auth/me', method: RequestMethod.ALL });
  }
}
