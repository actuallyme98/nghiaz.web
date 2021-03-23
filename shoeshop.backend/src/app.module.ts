import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import * as mailgunTransport from 'nodemailer-mailgun-transport';

import { ApiModule } from '@api/api.module';
import { AdminModule } from '@admin/admin.module';
import { configuration } from '@config';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: 'admin',
    module: AdminModule,
  },
  {
    path: 'api',
    module: ApiModule,
  },
];

@Module({
  imports: [
    // load config
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.prod',
      load: [configuration],
    }),
    // DB Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('database.type') as any,
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get<string>('database.name'),
          // try autoload entities
          autoLoadEntities: true,
          // {module}/entities/entity.entity.ts
          entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
          // entities: ENTITIES,
          // use cli and run schema:sync is better for secured data
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    // setup routes
    RouterModule.forRoutes(routes),
    // add modules
    SharedModule,
    ApiModule,
    AdminModule,
    // public folder
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public')
    // }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: mailgunTransport({
          auth: {
            api_key: configService.get('mail.apiKey'),
            domain: configService.get('mail.domain'),
          },
        }),
        defaults: {
          from: configService.get('mail.sendFrom'),
        },
      }),
      inject: [ConfigService],
    }),
    // schedule
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
