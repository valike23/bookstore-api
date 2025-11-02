import 'reflect-metadata';
import { sequelize } from '../../config/db';
import { Book, Cart, CartItem, Customer } from '../../model';
import { OrderService } from '../../modules/orders/order.service';

describe('OrderService.history', () => {
  const svc = new OrderService();

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const u = await Customer.create({ name: 'H', email: 'h@h.com' } as any);
    const b1 = await Book.create({ title: 'A', author: 'A', genre: 'G', price: '5.00', stock: 10 } as any);
    const b2 = await Book.create({ title: 'B', author: 'A', genre: 'G', price: '6.00', stock: 10 } as any);

    // create one cart
    const cart = await Cart.create({ customerId: u.id } as any);

    // first order (older)
    await CartItem.create({ cartId: cart.id, bookId: b1.id, quantity: 2 } as any);
    await svc.checkout(u.id);

    // second order (newer) — reuse same cart (items were cleared by checkout)
    const sameCart = await Cart.findOne({ where: { customerId: u.id } }) as any;
    await CartItem.create({ cartId: sameCart.id, bookId: b2.id, quantity: 1 } as any);
    await svc.checkout(u.id);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('returns orders in desc createdAt order with items', async () => {
    const u = await Customer.findOne({ where: { email: 'h@h.com' } });
    const orders = await svc.history(u!.id);

    expect(orders.length).toBe(2);
    expect(new Date(orders[0].createdAt).getTime())
      .toBeGreaterThanOrEqual(new Date(orders[1].createdAt).getTime());
    expect(orders[0].items.length).toBeGreaterThan(0);
    expect(orders[1].items.length).toBeGreaterThan(0);
  });
});
