import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import { bookRouter } from './modules/books/book.routes';
import { cartRouter } from './modules/cart/cart.routes';
import { orderRouter } from './modules/orders/order.routes';
import { mountSwagger } from './config/swagger';

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(cors());

  app.use(morgan('dev'));

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // routes
  app.use('/books', bookRouter);
  app.use('/cart', cartRouter);
  app.use('/orders', orderRouter);


  app.use(errorHandler);
    mountSwagger(app);

  return app;
}
