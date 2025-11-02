
import 'reflect-metadata';
import { sequelize } from '../../config/db';
import { Book, Customer, CartItem, Cart } from '../../model';
import { OrderService } from '../../modules/orders/order.service';

describe('OrderService.checkout', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Customer.create({ name: 'Test', email: 'test@x.com' } as any);
    await Book.create({ title: 'T1', author: 'A', genre: 'G', price: '10.00', stock: 2 } as any);
  });

  it('completes an order and decrements stock', async () => {
    const cust = await Customer.findOne({ where: { email: 'test@x.com' } });
    const book = await Book.findOne({ where: { title: 'T1' } });
    const cart = await Cart.create({ customerId: cust!.id } as any);
    await CartItem.create({ cartId: cart.id, bookId: book!.id, quantity: 2 } as any);

    const svc = new OrderService();
    const res = await svc.checkout(cust!.id);

    expect(res.status).toBe('completed');
    expect(res.total).toBe(20);
    const b2 = await Book.findByPk(book!.id);
    expect(b2!.stock).toBe(0);
  });
});
