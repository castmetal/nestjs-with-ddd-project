import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DataSource,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: parseInt(configService.get<string>('database.port'), 10),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db'),
        schema: configService.get<string>('database.schema'),
        entities: [configService.get<string>('orm.entities')],
        migrations: [configService.get<string>('orm.migrations')],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
