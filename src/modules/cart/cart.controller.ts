import { Request, Response } from 'express';
import { asyncHandler } from '../../middlewares/asyncHandler';
import { AppError } from '../../common/errors/AppError';
import { getCustomerId } from '../../common/getCustomerId';
import { CartService } from './cart.service';

const service = new CartService();

export class CartController {
  addItem = asyncHandler(async (req: Request, res: Response) => {
    const customerId = getCustomerId(req);
    const { bookId, quantity } = req.body as { bookId?: number; quantity?: number };

    if (!bookId) throw new AppError(400, 'bookId is required');
    const result = await service.addItem(customerId, Number(bookId), Number(quantity ?? 1));
    return res.status(201).json({ message: 'Item added to cart', ...result });
  });

  getCart = asyncHandler(async (req: Request, res: Response) => {
    const customerId = getCustomerId(req);
    const result = await service.getCart(customerId);
    return res.json(result);
  });
}
