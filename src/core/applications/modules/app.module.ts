import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../../../controllers/http-controllers/app.controller';
import { AppService } from '../services/app.service';
import configuration from '../../../config/configuration';
import { DatabaseModule } from '../../../infra/db/database.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { AuthMiddleware } from '../../../core/domains/common/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
