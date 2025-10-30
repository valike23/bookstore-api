import { Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/asyncHandler';
import { getCustomerId } from '../../common/getCustomerId';
import { OrderService } from './order.service';

const service = new OrderService();

export class OrderController {
  checkout = asyncHandler(async (req: Request, res: Response) => {
    const customerId = getCustomerId(req);
    const result = await service.checkout(customerId);
    return res.status(201).json(result);
  });

  history = asyncHandler(async (req: Request, res: Response) => {
    const customerId = getCustomerId(req);
    const orders = await service.history(customerId);
    return res.json({ orders });
  });
}
