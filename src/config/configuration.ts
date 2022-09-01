export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'myusername',
    password: process.env.DATABASE_PASSWORD || 'mypassword',
    db: process.env.DATABASE_DB || 'postgres',
    schema: process.env.DATABASE_SCHEMA || 'public',
  },
  orm: {
    entities: __dirname + '/../core/domains/**/*.entity{.ts,.js}',
    migrations: __dirname + '/../infra/db/migrations/*{.ts,.js}',
  },
});
