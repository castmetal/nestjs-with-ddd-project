import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import configuration from '../../config/configuration';

config();

export default new DataSource({
  type: 'postgres',
  host: configuration().database.host,
  port: configuration().database.port,
  username: configuration().database.username,
  password: configuration().database.password,
  database: configuration().database.db,
  schema: configuration().database.schema,
  entities: [configuration().orm.entities],
  migrations: [configuration().orm.migrations],
});
