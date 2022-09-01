import { Module } from '@nestjs/common';
import { AppController } from '../../../controllers/http-controllers/app.controller';
import { AppService } from '../services/app.service';
import configuration from '../../../config/configuration';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../../infra/db/database.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
