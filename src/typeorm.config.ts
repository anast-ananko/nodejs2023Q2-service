import * as dotenv from 'dotenv';

dotenv.config();

export const configPostgres = {
  type: 'postges',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: false,
  entities: [],
  migrations: [],
  migrationsRun: true,
  logging: true,
};
