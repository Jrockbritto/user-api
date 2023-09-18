import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
  entities: ['dist/modules/**/entity/*.entity.js'],
  migrations: ['dist/shared/infrastructure/orm/migrations/*{.ts,.js}'],
  migrationsTableName: 'history',
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
