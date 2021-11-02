import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        // entities: [],
        synchronize: process.env.DEPLOY_ENV === 'dev',
      }),
  },
];
