import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const configPostgres: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  logging: false,
};

const dataSource = new DataSource(configPostgres);

export default dataSource;
