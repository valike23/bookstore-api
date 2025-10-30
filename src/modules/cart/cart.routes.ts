import { Router } from 'express';
import { CartController } from './cart.controller';

const controller = new CartController();
export const cartRouter = Router();

cartRouter.post('/items', controller.addItem);
cartRouter.get('/', controller.getCart);
