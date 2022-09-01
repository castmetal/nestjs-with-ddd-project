import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.providers';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: parseInt(configService.get<string>('database.port'), 10),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db'),
        schema: configService.get<string>('database.schema'),
        entities: [configService.get<string>('orm.entities')],
        migrations: [configService.get<string>('orm.migrations')],
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
