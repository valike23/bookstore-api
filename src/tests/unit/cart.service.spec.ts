import 'reflect-metadata';
import { sequelize } from '../../config/db';
import { CartService } from '../../modules/cart/cart.service';
import { Book, Customer } from '../../model';

describe('CartService', () => {
  const svc = new CartService();

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Customer.create({ name: 'User', email: 'u@example.com' } as any);
    await Book.bulkCreate([
      { title: 'B1', author: 'A', genre: 'G', price: '10.00', stock: 5 } as any,
      { title: 'B2', author: 'A', genre: 'G', price: '7.50', stock: 5 } as any,
    ]);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('creates cart if missing, adds item, and merges quantities', async () => {
    const user = await Customer.findOne({ where: { email: 'u@example.com' } });
    const b1 = await Book.findOne({ where: { title: 'B1' } });

    let result = await svc.addItem(user!.id, b1!.id, 2);
    expect(result.items.length).toBe(1);
    expect(result.items[0].quantity).toBe(2);
    expect(result.total).toBeCloseTo(20.0);

    result = await svc.addItem(user!.id, b1!.id, 3);
    expect(result.items.length).toBe(1);
    expect(result.items[0].quantity).toBe(5);
    expect(result.total).toBeCloseTo(50.0);

    const b2 = await Book.findOne({ where: { title: 'B2' } });
    result = await svc.addItem(user!.id, b2!.id, 2);
    expect(result.items.length).toBe(2);
    expect(result.total).toBeCloseTo(65.0);
  });
});
