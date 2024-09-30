import { DataSource } from 'typeorm';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

let rootFolder = '';
if (!existsSync('./src')) {
  rootFolder = 'dist/';
}

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(<string>process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  entities: [`${rootFolder}src/entities/**/**.entity.{ts,js}`],
  migrationsTableName: 'schema_migrations',
  migrations: [`${rootFolder}src/database/migration/**/**.{ts,js}`],
});
