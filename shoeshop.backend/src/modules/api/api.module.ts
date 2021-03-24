import { Module, NestModule, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { CONTROLLERS } from '@api/controllers';
import { SERVICES, EXPORT_SERVICES } from '@api/services';
import { ENTITIES } from './entities';
import { AuthMiddleware } from '@api/middlewares';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    ConfigModule,
    TypeOrmModule.forFeature(ENTITIES),
    HttpModule,
    SharedModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload/assets',
      }),
    }),
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
  exports: [...EXPORT_SERVICES],
})
export class ApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'api/users', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/api/delivery-address', method: RequestMethod.ALL });
  }
}
