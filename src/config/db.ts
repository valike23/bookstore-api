import { Sequelize } from 'sequelize-typescript';
import { ENV } from './env';
import { MODELS } from '../model';
export const sequelize = new Sequelize({
  database: ENV.DB_NAME,
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: 'mysql',
  models: MODELS,
  logging: ENV.NODE_ENV === 'development' ? console.log : false,
});


