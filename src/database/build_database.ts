import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import * as dotenv from 'dotenv';

dotenv.config();

export function buildTypeOrmModule(
  params: Partial<PostgresConnectionCredentialsOptions> = {},
) {
  return TypeOrmModule.forRootAsync({
    useFactory: async (config: ConfigService) => {
      return {
        type: 'postgres',
        username: process.env.POSTGRES_USER,
        password: <string>process.env.POSTGRES_PASSWORD,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize: false,
        entities: [join(__dirname, '../entities/**/**.entity.{ts,js}')],
        uuidExtension: 'pgcrypto',
        migrations: [join(__dirname, 'migration/**/**.{ts,js}')],
        migrationsTableName: 'schema_migrations',
        cli: {
          migrationsDir: join(__dirname, 'migration'),
        },
        seeds: [join(__dirname, '../seeds/**/**.seeder.{ts,js}')],
      };
    },
  });
}
