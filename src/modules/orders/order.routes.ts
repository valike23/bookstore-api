import { Router } from 'express';
import { OrderController } from './order.controller';

const controller = new OrderController();
export const orderRouter = Router();

orderRouter.post('/checkout', controller.checkout);

orderRouter.get('/history', controller.history);
