import 'reflect-metadata';
import { sequelize } from '../../config/db';
import { Book, Cart, CartItem, Customer } from '../../model';
import { OrderService } from '../../modules/orders/order.service';

describe('OrderService.checkout - insufficient stock', () => {
  const svc = new OrderService();

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const u = await Customer.create({ name: 'X', email: 'x@x.com' } as any);
    const b = await Book.create({ title: 'Low', author: 'A', genre: 'G', price: '12.00', stock: 1 } as any);
    const cart = await Cart.create({ customerId: u.id } as any);
    await CartItem.create({ cartId: cart.id, bookId: b.id, quantity: 2 } as any);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('throws 400 and leaves stock unchanged', async () => {
    const user = await Customer.findOne({ where: { email: 'x@x.com' } });
    const book = await Book.findOne({ where: { title: 'Low' } });

    await expect(svc.checkout(user!.id)).rejects.toMatchObject({ statusCode: 400 });
    await expect(svc.checkout(user!.id)).rejects.toHaveProperty('message');

    const fresh = await Book.findByPk(book!.id);
    expect(fresh!.stock).toBe(1);
  });
});
