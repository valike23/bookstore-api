import { AppError } from '../../common/errors/AppError';
import { Book } from '../../model';
import { CartRepository } from './cart.repository';

export class CartService {
  constructor(private readonly repo = new CartRepository()) {}

  async addItem(customerId: number, bookId: number, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new AppError(400, 'Quantity must be an integer >= 1');
    }

    const book = await Book.findByPk(bookId);
    if (!book) throw new AppError(404, 'Book not found');

    const cart = await this.repo.findOrCreateCart(customerId);

    const existing = await this.repo.findCartItem(cart.id, bookId);
    if (existing) {
      const newQty = existing.quantity + quantity;
      await this.repo.updateCartItemQuantity(existing.id, newQty);
    } else {
      await this.repo.createCartItem(cart.id, bookId, quantity);
    }

    return this.getCart(customerId);
  }

  async getCart(customerId: number) {
    const cart = await this.repo.findOrCreateCart(customerId);
    const withItems = await this.repo.findCartWithItems(cart.id);
   const items = (withItems as any)?.items?.map((ci: any) => ({
  cartItemId: ci.id,
  bookId: ci.bookId,
  title: ci.book.title,                 // <-- aliased include
  price: parseFloat(ci.book.price),
  quantity: ci.quantity,
  subtotal: parseFloat(ci.book.price) * ci.quantity,
})) ?? [];
    const total = items.reduce((sum: number, it: any) => sum + it.subtotal, 0);
    return { items, total };
  }
}
